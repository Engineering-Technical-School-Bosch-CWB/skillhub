using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ISkillResultService : IService<SkillResult>
{
    public Task<AppResponse<CompleteSkillResultDTO>> GetSkillResultBySkill(int skillId, int studentId);
    public Task<AppResponse<IEnumerable<SkillResult>>> EvaluateExam(int examId, IEnumerable<StudentEvaluatePayload> payload);
    public Task<AppResponse<SkillHistoryResponse>> GetSkillResultHistory(int studentId, int skillId);
    
}
