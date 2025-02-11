using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ISkillResultService : IService<SkillResult>
{
    public double? GetSkillAverageByClass(int skillId, int classId);
    public Task<AppResponse<SkillResultDTO>> GetSkillResultBySkill(int skillId, int studentId);
    public Task<AppResponse<SkillHistoryResponse>> GetSkillResultHistory(int studentId, int skillId);
}
