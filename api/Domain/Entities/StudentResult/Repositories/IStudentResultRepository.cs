using Genesis.Domain.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Domain.Repositories;
public interface IStudentResultRepository : IRepository<StudentResult>
{
    public (IEnumerable<StudentResult>, PaginationInfo?) GetPaginated(PaginationOptions options);
    public Task<(IEnumerable<StudentResult>, PaginationInfo?)> GetPaginatedAsync(PaginationOptions options);
}
