using Genesis.Domain.Repositories;
using Api.Domain.Models;
<<<<<<< HEAD
using Api.Domain.Services;
=======
using Api.Domain.Services.Pagination;
>>>>>>> dev

namespace Api.Domain.Repositories;

public interface IPositionRepository : IRepository<Position>
{
    public (IEnumerable<Position>, PaginationInfo) GetPaginated(PaginationOptions options);
    public Task<(IEnumerable<Position>, PaginationInfo)> GetPaginatedAsync(PaginationOptions options);
}
