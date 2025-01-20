using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IStudentService : IService<Student>
{
    public Task<AppResponse<StudentDTO>> CreateStudent(StudentCreatePayload payload);
    public Task<StudentDTO?> GetByUserId(int id);
    public double? GetSubjectGrade(int id, int subjectId);
    public StudentExamResultsDTO GetExamResults(int id, int examId);
    public Task<AppResponse<StudentResultResponse>> GetResultsPage(int id);
    public Task<AppResponse<StudentSubjectResultResponse>> GetSubjectResultsPage(int id, int subjectId);
}
