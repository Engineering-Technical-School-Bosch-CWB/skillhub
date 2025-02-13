using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ISkillResultService : IService<SkillResult>
{
    public double? GetSkillAverageByClass(int skillId, int classId);
    public Task<AppResponse<CompleteSkillResultDTO>> GetSkillResultBySkill(int skillId, int studentId);
    public Task<AppResponse<IEnumerable<SkillResult>>> EvaluateExam(int examId, IEnumerable<StudentEvaluatePayload> payload);
    public Task<AppResponse<SkillHistoryResponse>> GetSkillResultHistory(int studentId, int skillId);
    public Task<AppResponse<EvaluateExamDTO>> GetExamEvaluationPage(int examId);
}
