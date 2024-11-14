using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Core.Services;

public class SpecificObjectivesService(BaseRepository<SpecificObjectives> repository)
    : BaseService<SpecificObjectives> (repository), ISpecificObjectivesService
{

}
