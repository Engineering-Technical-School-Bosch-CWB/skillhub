using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Core.Services;

public class SectorService(BaseRepository<Sector> repository)
    : BaseService<Sector>(repository), ISectorService
{
    public Task<SectorResponse> CreateSector(SectorCreatePayload payload)
    {
        throw new NotImplementedException();
    }

    public Task DeleteSector(int id)
    {
        throw new NotImplementedException();
    }

    public Task<SectorResponse> GetSectorById(int id)
    {
        throw new NotImplementedException();
    }

    public Task<SectorPaginationResponse> GetSectors(PaginationOptions options)
    {
        throw new NotImplementedException();
    }

    public Task<SectorResponse> UpdateSector(int id, SectorUpdatePayload payload)
    {
        throw new NotImplementedException();
    }
}
