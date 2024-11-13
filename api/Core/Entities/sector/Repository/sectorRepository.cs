using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class SectorRepository(Project_eContext context) 
    : BaseRepository<Sector>(context), ISectorRepository
{

}
