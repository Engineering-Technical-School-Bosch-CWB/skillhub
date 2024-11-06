using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class SpecificObjectivesRepository(Project_eContext context) 
    : BaseRepository<SpecificObjectives>(context), ISpecificObjectivesRepository
{

}
