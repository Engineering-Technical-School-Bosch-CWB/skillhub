using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class PositionRepository(Project_eContext context) 
    : BaseRepository<Position>(context), IPositionRepository
{

}
