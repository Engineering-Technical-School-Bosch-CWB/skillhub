using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class CurricularUnitRepository(SkillhubContext context) 
    : BaseRepository<CurricularUnit>(context), ICurricularUnitRepository
{

}
