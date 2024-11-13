using Genesis.Domain.Services;
using Api.Domain.Models;
using api.Domain.Models;
using api.Domain.Services.Pagination;

namespace Api.Domain.Services;

public interface IPositionService : IService<Position>
{
    public Task<PaginatedPositionsResponse> GetPaginated(PaginationQuery pagination);
    public Task<PaginatedPositionsResponse> GetPaginatedAsync(PaginationQuery pagination);
}
