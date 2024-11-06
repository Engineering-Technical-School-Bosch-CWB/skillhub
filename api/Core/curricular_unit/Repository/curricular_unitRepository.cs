using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class CurricularUnitRepository(Project_eContext context) 
    : BaseRepository<CurricularUnit>(context), ICurricularUnitRepository
{

}
