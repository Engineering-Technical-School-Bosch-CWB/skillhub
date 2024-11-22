using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class SpecificObjectivesRepository(SkillhubContext context) 
    : BaseRepository<SpecificObjectives>(context), ISpecificObjectivesRepository
{

}
