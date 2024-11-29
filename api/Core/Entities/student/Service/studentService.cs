using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class StudentService(
    BaseRepository<Student> repository, IUserRepository userRepository,
    IClassRepository classRepository, ISkillResultRepository skillResultRepository
    ) : BaseService<Student>(repository), IStudentService

{
    private readonly IUserRepository _userRepo = userRepository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;

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

        var createdStudent = repository.Add(newStudent)
            ?? throw new UpsertFailException("Student could not be inserted!");

        await repository.SaveAsync();

        return new AppResponse<StudentDTO>(
            StudentDTO.Map(createdStudent),
            "Student created successfully!"
        );
    }

    public async Task<StudentDTO?> GetByUserId(int id)
    {
        var student = await repository.Get()
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
            .Where(s => s.Aptitude.HasValue)
            .GroupBy(s => s.Skill)
            .Select(g => g.OrderByDescending(s => s.EvaluatedAt).First())
            .ToListAsync();

        if (skillResults.Count == 0)
            return null;

        var totalWeight = skillResults.Sum(s => s.Weight);
        var totalAptitude = skillResults.Sum(s => s.Aptitude * s.Weight);

        return totalAptitude / totalWeight;
    }
}
