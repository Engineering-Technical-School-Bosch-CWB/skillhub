using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class PositionRepository(SkillhubContext context) 
    : BaseRepository<Position>(context), IPositionRepository
{

}
