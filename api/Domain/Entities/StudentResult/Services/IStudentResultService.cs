using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IStudentResultService : IService<User>
{
    public Task AttExamResult(Exam exam);
    public Task UpdateExamResult(Student student, Exam exam, double? score);
    public Task UpdateSubjectResult(Student student, Subject subject, double? score);
}
