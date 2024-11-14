using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class CurricularUnitRepository(Project_eContext context) 
    : BaseRepository<CurricularUnit>(context), ICurricularUnitRepository
{

}
