using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IClassService : IService<Class>
{
    public Task<AppResponse<ClassDTO>> CreateClass(ClassCreatePayload payload);
    public Task<double?> GetSkillMean(int id, int skillId);
    public double? GetSubjectMean(int id, int subjectId);
}
