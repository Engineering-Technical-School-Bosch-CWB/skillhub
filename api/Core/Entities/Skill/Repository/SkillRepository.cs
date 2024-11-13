using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class SkillRepository(Project_eContext context) 
    : BaseRepository<Skill>(context), ISkillRepository
{

}
