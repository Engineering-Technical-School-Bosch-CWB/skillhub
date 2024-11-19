using Api.Domain.Services.Pagination;
using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ISectorService : IService<Sector>
{
    public Task<SectorResponse> CreateSector(SectorCreatePayload payload);
    public Task DeleteSector(int id);
    public Task<SectorPaginationResponse> GetSectors(PaginationOptions options);
    public Task<SectorResponse> GetSectorById(int id);
    public Task<SectorResponse> UpdateSector(int id, SectorUpdatePayload payload);
}
