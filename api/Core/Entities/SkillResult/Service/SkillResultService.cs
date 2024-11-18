using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Core.Services;

public class SkillResultService(BaseRepository<SkillResult> repository)
    : BaseService<SkillResult> (repository), ISkillResultService
{

}
