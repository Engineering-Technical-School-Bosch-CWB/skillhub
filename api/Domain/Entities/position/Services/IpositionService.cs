using Genesis.Domain.Services;
using Api.Domain.Models;
using api.Domain.Models;
using api.Domain.Services.Pagination;

namespace Api.Domain.Services;

public interface IPositionService : IService<Position>
{
    public PaginatedPositionsResponse GetPaginated(PaginationQuery pagination);
    public Task<PaginatedPositionsResponse> GetPaginatedAsync(PaginationQuery pagination);
    public Task<PositionResponse> UpdatePositionAsync(int id, PositionPayload position);
    public void SoftDelete (int id);
    public Task SoftDeleteAsync(int id);
}
