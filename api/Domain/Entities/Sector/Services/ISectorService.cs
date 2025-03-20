using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ISectorService : IService<Sector>
{
    public Task<AppResponse<SectorDTO>> CreateSector(SectorCreatePayload payload);
    public Task DeleteSector(int id);
    public Task<PaginatedAppResponse<SectorDTO>> GetSectors(PaginationQuery pagination);
    public Task<AppResponse<SectorDTO>> GetSectorById(int id);
    public Task<AppResponse<SectorDTO>> UpdateSector(int id, SectorUpdatePayload payload);
}
