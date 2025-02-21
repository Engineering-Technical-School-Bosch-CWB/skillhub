using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class SpecificObjectiveRepository(SkillhubContext context) 
    : BaseRepository<SpecificObjective>(context), ISpecificObjectiveRepository
{

}
