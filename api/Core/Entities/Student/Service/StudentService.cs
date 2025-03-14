using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class StudentService(
    BaseRepository<Student> repository, IUserRepository userRepository, ISubjectRepository subjectRepository, ISkillService skillService,
    IClassRepository classRepository, ISkillResultRepository skillResultRepository, IFeedbackRepository feedbackRepository, IStudentResultRepository studentResultRepository
) : BaseService<Student>(repository), IStudentService

{
    private readonly BaseRepository<Student> _repo = repository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly IFeedbackRepository _feedbackRepo = feedbackRepository;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;
    private readonly IUserRepository _userRepo = userRepository;
    private readonly IStudentResultRepository _studentResultRepository = studentResultRepository;

    private readonly ISkillService _skillService = skillService;

    #region CRUD

    public async Task<AppResponse<StudentDTO>> CreateStudent(StudentCreatePayload payload)
    {
        var user = await _userRepo.Get()
            .SingleOrDefaultAsync(u => u.Id == payload.UserId)
            ?? throw new NotFoundException("User not found!");

        var class_ = await _classRepo.Get()
            .SingleOrDefaultAsync(c => c.Id == payload.ClassId)
            ?? throw new NotFoundException("Class not found!");

        if (await _repo.Get().SingleOrDefaultAsync(s => s.User.Id == payload.UserId) is not null)
            throw new AlreadyExistsException("User is already a student!");

        var newStudent = new Student
        {
            User = user,
            Class = class_
        };

        var createdStudent = _repo.Add(newStudent)
            ?? throw new UpsertFailException("Student could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<StudentDTO>(
            StudentDTO.Map(createdStudent),
            "Student created successfully!"
        );
    }

    #endregion

    #region Services

    public async Task<StudentDTO?> GetByUserId(int userId)
    {
        var student = await _repo.Get()
            .Include(s => s.Class)
            .SingleOrDefaultAsync(s => s.User.Id == userId);

        return student is not null ? StudentDTO.Map(student) : null;
    }

    public (double?, double?) GetSubjectGrade(int id, int subjectId)
    {

        var results = _studentResultRepository.Get()
            .Where(s => s.IsActive && s.Student.Id == id)
            .SingleOrDefault(s => s.Subject!.Id == subjectId);

        return (results?.Score, results?.SkillScore);
    }

    public StudentExamResultsDTO GetExamResults(int id, int examId)
    {
        var student = _repo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.User)
            .SingleOrDefault(s => s.Id == id) ?? throw new NotFoundException("Student not found!");

        var results = _skillResultRepo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Exam != null && s.Exam.Id == examId)
            .Where(s => s.Student.Id == id)
            .Include(s => s.Student.User)
            .Include(s => s.Skill.CurricularUnit)
            .GroupBy(s => s.Skill)
            .Select(g => g.OrderBy(s => s.EvaluatedAt).First())
            .AsEnumerable();

        return StudentExamResultsDTO.Map(
            student,
            results.Where(s => s.Aptitude.HasValue).Any() ? results.Where(s => s.Weight != 0).Sum(s => s.Aptitude * s.Weight) / results.Where(s => s.Weight != 0).Sum(s => s.Weight) : null,
            results.Select(SimpleSkillResultDTO.Map).OrderBy(s => s.SkillId)
        );
    }

    public async Task<StudentProfileDTO?> GetStudentProfile(int userId, bool show)
    {
        var student = await _repo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.Class.Subjects)
                .ThenInclude(s => s.CurricularUnit)
                .ThenInclude(s => s.SubjectArea)
            .Include(s => s.Class.Subjects.Where(s => s.IsActive))
                .ThenInclude(s => s.Instructor)
            .SingleOrDefaultAsync(s => s.User.Id == userId);

        if (student is null) return null;

        var results = student.Class.Subjects.Select(s => SubjectResultDTO.Map(s, GetSubjectGrade(student.Id, s.Id)));

        var position = _repo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Class.Id == student.Class.Id)
            .Where(s => s.OverallScore != null)
            .OrderByDescending(s => s.OverallScore)
            .AsEnumerable()
            .Select((s, index) => new { s.Id, Position = index + 1 })
            .FirstOrDefault(x => x.Id == student.Id)?.Position;

        var feedbacks = await _feedbackRepo.Get()
            .Where(f => f.IsActive)
            .Where(f => f.Student.Id == student.Id)
            .Include(f => f.Student.User)
            .Include(f => f.Instructor)
            .Include(f => f.Subject!.CurricularUnit)
            .OrderByDescending(f => f.UpdatedAt)
            .Select(f => CompleteFeedbackDTO.Map(f))
            .ToListAsync();

        List<SubjectAreaDTO> subjectAreaResults = [.. results
            .GroupBy(s => s.SubjectArea)
            .Select(gs => SubjectAreaDTO.Map(gs.Key!, (gs.Average(k => k.Grade), gs.Average(k => k.Aptitude))))];

        var result = StudentProfileDTO.Map(student, subjectAreaResults, results, feedbacks, show, position);
        return result;
    }

    public async Task AttStudentScores(int id)
    {
        var student = await _repo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.Results)
            .ThenInclude(s => s.Subject)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Student not found!");

        var studentResults = student.Results.Where(r => r.IsActive && r.Score.HasValue && r.Subject != null && r.Subject.IsActive);

        student.OverallScore = studentResults.Any() ? studentResults.Average(r => r.Score) : null;

        var results = _skillResultRepo.Get()
            .Where(s => s.IsActive && s.Student.Id == id)
            .Where(s => s.Weight != 0)
            .Where(s => s.Aptitude.HasValue)
            .GroupBy(s => s.Skill)
            .Select(g => g.OrderByDescending(s => s.Aptitude).First())
            .AsEnumerable();

        student.OverallSkillScore = results.Where(s => s.Aptitude.HasValue).Any() ? results.Sum(s => s.Aptitude * s.Weight) / results.Sum(s => s.Weight) : null;

        _repo.Update(student);
        await _repo.SaveAsync();
    }

    #endregion

    #region Pages

    public async Task<AppResponse<StudentResultResponse>> GetResultsPage(int id, string query)
    {
        var student = await _repo.Get()
            .Include(s => s.Class)
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Student not found!");

        var subjects = await _subjectRepo.Get()
            .Include(s => s.Instructor)
            .Include(s => s.CurricularUnit)
            .Include(s => s.Class)
            .Where(s => s.IsActive && s.Class == student.Class)
            .ToListAsync();

        var results = subjects.Select(s => new StudentResultDTO(SubjectDTO.Map(s), GetSubjectGrade(id, s.Id).Item2, s.CurricularUnit.Name.Contains(query, StringComparison.OrdinalIgnoreCase)));

        return new AppResponse<StudentResultResponse>(
            StudentResultResponse.Map(StudentDTO.Map(student), results),
            "Users results found!"
        );
    }

    public async Task<AppResponse<StudentSubjectResultResponse>> GetSubjectResultsPage(int id, int subjectId)
    {
        var student = await _repo.Get()
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Student not found!");

        var subject = await _subjectRepo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.CurricularUnit)
            .Include(s => s.Class.Students.Where(s => s.IsActive))
            .SingleOrDefaultAsync(s => s.Id == subjectId)
            ?? throw new NotFoundException("Subject not found!");

        var feedback = await _feedbackRepo.Get()
            .Include(f => f.Instructor)
            .Where(f => f.IsActive && f.Subject!.Id == subjectId)
            .SingleOrDefaultAsync(f => f.Student.Id == id);

        var skillResults = await _skillResultRepo.Get()
            .Where(s => s.IsActive && s.Student.Id == id)
            .Where(s => s.Skill.CurricularUnit.Id == subject.CurricularUnit.Id)
            .Include(s => s.Skill)
            .GroupBy(s => s.Skill)
            .Select(g => g.OrderByDescending(s => s.Aptitude).First())
            .ToListAsync();

        var results = skillResults
            .Select(s => CompleteSkillResultDTO.Map(s, _skillService.GetSkillAverageByClass(s.Skill.Id, subject.Class.Id)));

        return new AppResponse<StudentSubjectResultResponse>(
            StudentSubjectResultResponse.Map(student, subject.CurricularUnit.Name, subject.Class.Students.Average(s => s.OverallSkillScore), results, feedback),
            "Subject results found!"
        );
    }

    #endregion
}
