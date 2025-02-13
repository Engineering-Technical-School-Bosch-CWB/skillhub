using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IExamService : IService<Exam>
{
    public Task<AppResponse<ExamDTO>> CreateExam(ExamCreatePayload payload);
    public Task DeleteExam(int examId);
    public IEnumerable<ExamSkillDTO> GetExamSkills(int id);
    public Task<ExamResultsDTO> GetClassResults(int id);
}
