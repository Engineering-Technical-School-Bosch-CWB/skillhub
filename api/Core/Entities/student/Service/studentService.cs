using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class StudentService(
    BaseRepository<Student> repository, IUserRepository userRepository, ISubjectRepository subjectRepository, IClassService classService,
    IClassRepository classRepository, ISkillResultRepository skillResultRepository, IFeedbackRepository feedbackRepository
    ) : BaseService<Student>(repository), IStudentService

{
    private readonly BaseRepository<Student> _repo = repository;
    private readonly IUserRepository _userRepo = userRepository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;
    private readonly IFeedbackRepository _feedbackRepo = feedbackRepository;
    private readonly IClassService _classService = classService;

    public async Task<AppResponse<StudentDTO>> CreateStudent(StudentCreatePayload payload)
    {
        var user = await _userRepo.Get()
            .SingleOrDefaultAsync(u => u.Id == payload.UserId)
            ?? throw new NotFoundException("User not found!");

        var studentclass = await _classRepo.Get()
            .SingleOrDefaultAsync(c => c.Id == payload.ClassId)
            ?? throw new NotFoundException("Class not found!");

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
    /// Retrieves the aptitude result for a specific student and subject, weighted by the skill weights.
    /// </summary>
    /// <param name="id">
    /// The ID of the student whose aptitude result is being retrieved.
    /// </param>
    /// <param name="subjectId">
    /// The ID of the subject for which the aptitude result is being calculated.
    /// </param>
    /// <returns>
    /// The weighted average aptitude for the specified student and subject.<br/>
    /// Returns <c>null</c> if no skill results are found for the given student and subject.
    /// </returns>
    /// <remarks>
    /// - This method calculates the aptitude result by considering only the most recent skill result for each skill.<br/>
    /// - The result is weighted based on the skill result's weight value.<br/>
    /// - If no aptitude values are found, the method returns <c>null</c>.<br/>
    /// </remarks>

    public async Task<double?> GetResultBySubject(int id, int subjectId)
    {
        var skillResults = await _skillResultRepo.Get()
            .Where(s => s.Student.Id == id)
            .Where(s => s.Subject!.Id == subjectId || s.Exam!.Subject.Id == subjectId)
            .Where(s => s.Aptitude.HasValue && s.IsActive)
            .GroupBy(s => s.Skill)
            .Select(g => g.OrderByDescending(s => s.EvaluatedAt).First())
            .ToListAsync();

        if (skillResults.Count == 0)
            return null;

        var totalWeight = skillResults.Sum(s => s.Weight);
        var totalAptitude = skillResults.Sum(s => s.Aptitude * s.Weight);

        return totalAptitude / totalWeight;
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
            results.Add(new StudentResultDTO(SubjectDTO.Map(subject), await GetResultBySubject(id, subject.Id)));

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

        var skillResults = await _skillResultRepo.Get()
            .Include(s => s.Student.Class)
            .Include(s => s.Skill)
            .Where(s => s.IsActive)
            .Where(s => s.Student.Id == id)
            .Where(s => s.Subject!.Id == subjectId || s.Exam!.Subject.Id == subjectId)
            .GroupBy(s => s.Skill)
            .Select(g => g.OrderByDescending(s => s.EvaluatedAt).First())
            .ToListAsync();

        var results = new List<SkillResultDTO>();

        foreach (var skillResult in skillResults)
            results.Add(SkillResultDTO.Map(skillResult, await _classService.GetSkillMean(skillResult.Student.Class.Id, skillResult.Skill.Id)));

        return new AppResponse<StudentSubjectResultResponse>(
            StudentSubjectResultResponse.Map(student, _classService.GetSubjectMean(student.Class.Id, subjectId), results, feedback),
            "Subject results found!"
        );
    }

}
