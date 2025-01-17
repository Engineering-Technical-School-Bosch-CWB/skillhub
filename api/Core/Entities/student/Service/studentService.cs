using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class StudentService(
    BaseRepository<Student> repository, IUserRepository userRepository, ISubjectRepository subjectRepository, ISkillResultService skillResultService,
    IClassRepository classRepository, ISkillResultRepository skillResultRepository, IFeedbackRepository feedbackRepository, IExamRepository examRepository
    ) : BaseService<Student>(repository), IStudentService

{
    private readonly BaseRepository<Student> _repo = repository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly IExamRepository _examRepo = examRepository;
    private readonly IFeedbackRepository _feedbackRepo = feedbackRepository;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;
    private readonly IUserRepository _userRepo = userRepository;

    private readonly ISkillResultService _skillResultService = skillResultService;

    public async Task<AppResponse<StudentDTO>> CreateStudent(StudentCreatePayload payload)
    {
        var user = await _userRepo.Get()
            .SingleOrDefaultAsync(u => u.Id == payload.UserId)
            ?? throw new NotFoundException("User not found!");

        var studentclass = await _classRepo.Get()
            .SingleOrDefaultAsync(c => c.Id == payload.ClassId)
            ?? throw new NotFoundException("Class not found!");

        if (await _repo.Get().SingleOrDefaultAsync(s => s.User.Id == payload.UserId) is not null)
            throw new AlreadyExistsException("User is already a student!");

        var newStudent = new Student
        {
            User = user,
            Class = studentclass
        };

        var createdStudent = _repo.Add(newStudent)
            ?? throw new UpsertFailException("Student could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<StudentDTO>(
            StudentDTO.Map(createdStudent),
            "Student created successfully!"
        );
    }

    public async Task<StudentDTO?> GetByUserId(int id)
    {
        var student = await _repo.Get()
            .Include(s => s.User)
            .Include(s => s.Class)
            .SingleOrDefaultAsync(s => s.User.Id == id);

        return student is not null ? StudentDTO.Map(student) : null;
    }

    /// <summary>
    /// Retrieves the weighted average aptitude grade for a specific student in a specific subject,
    /// based on their most recent skill evaluations.
    /// </summary>


    public double? GetSubjectGrade(int id, int subjectId)
    {
        var subjectExams = _examRepo.Get()
            .Where(e => e.IsActive)
            .Where(e => e.Subject.Id == subjectId)
            .Include(e => e.SkillResults)
            .ThenInclude(s => s.Student)
            .Include(e => e.SkillResults)
            .ThenInclude(s => s.Skill)
            .AsEnumerable();

        return subjectExams.Select(e =>
            {
                var results = e.SkillResults
                    .Where(s => s.IsActive && s.Student.Id == id && s.Aptitude.HasValue)
                    .GroupBy(s => s.Skill)
                    .Select(g => g.OrderBy(s => s.EvaluatedAt).First());

                return results.Any() ? results.Sum(s => s.Aptitude * s.Weight) / results.Sum(s => s.Weight) : null;
            }
        ).Average();
    }

    public async Task<AppResponse<StudentResultResponse>> GetResultsPage(int id)
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
            .Where(s => s.Class == student.Class)
            .ToListAsync();

        var results = new List<StudentResultDTO>();

        foreach (var subject in subjects)
            results.Add(new StudentResultDTO(SubjectDTO.Map(subject), GetSubjectGrade(id, subject.Id)));

        return new AppResponse<StudentResultResponse>(
            StudentResultResponse.Map(StudentDTO.Map(student), results),
            "Users results found!"
        );
    }

    public async Task<AppResponse<StudentSubjectResultResponse>> GetSubjectResultsPage(int id, int subjectId)
    {
        var student = await _repo.Get()
            .Include(s => s.Class)
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Student not found!");

        var subject = await _subjectRepo.Get()
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == subjectId)
            ?? throw new NotFoundException("Subject not found!");

        var feedback = await _feedbackRepo.Get()
            .Include(f => f.Instructor)
            .Where(f => f.IsActive)
            .Where(f => f.Subject!.Id == subjectId)
            .SingleOrDefaultAsync(f => f.Student.Id == id);

        var results = await _skillResultRepo.Get()
            .Include(s => s.Student.Class)
            .Include(s => s.Skill)
            .Where(s => s.IsActive)
            .Where(s => s.Student.Id == id)
            .Where(s => s.Subject!.Id == subjectId || s.Exam!.Subject.Id == subjectId)
            .GroupBy(s => s.Skill)
            .Select(g => g.OrderByDescending(s => s.EvaluatedAt).First())
            .Select(s => SkillResultDTO.Map(s, _skillResultService.GetSkillAverageByClass(s.Skill.Id, s.Student.Class.Id)))
            .ToListAsync();

        var classStudents = await _repo.Get()
            .Where(s => s.IsActive && s.Class.Id == student.Class.Id)
            .ToListAsync();

        return new AppResponse<StudentSubjectResultResponse>(
            StudentSubjectResultResponse.Map(student, classStudents.Average(s => GetSubjectGrade(s.Id, subjectId)), results, feedback),
            "Subject results found!"
        );
    }

}
