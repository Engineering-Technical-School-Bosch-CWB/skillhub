using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IExamService : IService<Exam>
{
    public Task<AppResponse<ExamDTO>> CreateExam(ExamCreatePayload payload);
    public Task<AppResponse<ExamDTO>> UpdateExam(int id, ExamUpdatePayload payload);
    public Task DeleteExam(int examId);
    public IEnumerable<ExamSkillDTO> GetExamSkills(int id);
    public Task<AppResponse<EvaluateExamDTO>> GetExamEvaluationPage(int examId);
    public Task<AppResponse<ExamSkillsDTO>> GetCreateExamPage(int subjectId);
    public Task<AppResponse<EditExamDTO>> GetEditExamPage(int id);
    
}
