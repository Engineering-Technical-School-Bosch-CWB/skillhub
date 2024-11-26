using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IPositionService : IService<Position>
{
    public Task<AppResponse<PositionDTO>> Get(int id);
    public PaginatedAppResponse<PositionDTO> GetPaginated(PaginationQuery pagination);
    public Task<PaginatedAppResponse<PositionDTO>> GetPaginatedAsync(PaginationQuery pagination);
    public Task<AppResponse<PositionDTO>> UpdatePositionAsync(int id, PositionUpdatePayload position);
    public void SoftDelete (int id);
    public Task SoftDeleteAsync(int id);
}
