using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ISkillService : IService<Skill>
{
    public Task<AppResponse<SkillDTO>> CreateSkill(SkillCreatePayload payload);
    public Task<AppResponse<SkillDTO>> UpdateSkill(int id, SkillUpdatePayload payload);
    public Task DeleteSkill(int id);
    public Task<AppResponse<SkillDTO>> GetSkill(int id);
    public Task<AppResponse<ExamSkillsDTO>> GetCreateExamPage(int curricularUnitId);
}
