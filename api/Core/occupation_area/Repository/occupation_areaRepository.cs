using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class OccupationAreaRepository(Project_eContext context) 
    : BaseRepository<OccupationArea>(context), IOccupationAreaRepository
{

}
