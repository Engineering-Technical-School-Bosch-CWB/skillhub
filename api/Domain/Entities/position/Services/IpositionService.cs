using Genesis.Domain.Services;
using Api.Domain.Models;
using Api.Domain.Services.Pagination;

namespace Api.Domain.Services;

public interface IPositionService : IService<Position>
{
    public PaginatedPositionsResponse GetPaginated(PaginationQuery pagination);
    public Task<PaginatedPositionsResponse> GetPaginatedAsync(PaginationQuery pagination);
}
