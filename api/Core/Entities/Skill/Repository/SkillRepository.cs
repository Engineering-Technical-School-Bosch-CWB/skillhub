using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class SkillRepository(SkillhubContext context) 
    : BaseRepository<Skill>(context), ISkillRepository
{

}
