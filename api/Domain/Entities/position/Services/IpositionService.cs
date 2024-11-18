using Genesis.Domain.Services;
using Api.Domain.Models;
using api.Domain.Models;
using Api.Domain.Services;

namespace Api.Domain.Services;

public interface IPositionService : IService<Position>
{
    public PaginatedPositionsResponse GetPaginated(PaginationQuery pagination);
    public Task<PaginatedPositionsResponse> GetPaginatedAsync(PaginationQuery pagination);
}
