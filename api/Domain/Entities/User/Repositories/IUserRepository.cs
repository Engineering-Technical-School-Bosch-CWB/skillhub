using Genesis.Domain.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Domain.Repositories;
public interface IUserRepository : IRepository<User>
{
    public (IEnumerable<User>, PaginationInfo?) GetPaginated(PaginationOptions options);
    public Task<(IEnumerable<User>, PaginationInfo?)> GetPaginatedAsync(PaginationOptions options);
}
