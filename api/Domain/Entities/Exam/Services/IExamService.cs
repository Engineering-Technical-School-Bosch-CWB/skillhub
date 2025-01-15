using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IExamService : IService<Exam>
{
    public Task<AppResponse<ExamDTO>> CreateExam(ExamCreatePayload payload);
    public Task<ExamResultsDTO> GetStudentsResults(int id);
}
