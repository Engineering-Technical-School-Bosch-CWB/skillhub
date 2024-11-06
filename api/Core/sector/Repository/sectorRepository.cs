using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class SectorRepository(Project_eContext context) 
    : BaseRepository<Sector>(context), ISectorRepository
{

}
