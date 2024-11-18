using Genesis.Domain.Repositories;
using Api.Domain.Models;
using api.Domain.Services.Pagination;

namespace Api.Domain.Repositories;

public interface IPositionRepository : IRepository<Position>
{
    public (IEnumerable<Position>, PaginationInfo) GetPaginated(PaginationOptions options);
    public Task<(IEnumerable<Position>, PaginationInfo)> GetPaginatedAsync(PaginationOptions options);
}
