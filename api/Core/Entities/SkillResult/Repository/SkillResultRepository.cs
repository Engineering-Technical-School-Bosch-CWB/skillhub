using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class SkillResultRepository(SkillhubContext context) 
    : BaseRepository<SkillResult>(context), ISkillResultRepository
{

}
