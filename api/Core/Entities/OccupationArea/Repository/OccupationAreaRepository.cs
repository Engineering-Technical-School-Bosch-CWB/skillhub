using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class OccupationAreaRepository(SkillhubContext context) 
    : BaseRepository<OccupationArea>(context), IOccupationAreaRepository
{

}
