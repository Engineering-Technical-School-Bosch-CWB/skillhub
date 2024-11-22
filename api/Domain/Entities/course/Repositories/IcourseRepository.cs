using Genesis.Domain.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Domain.Repositories;

public interface ICourseRepository : IRepository<Course>
{
    public Task<(IEnumerable<Course>, PaginationInfo)> GetPaginatedAsync(PaginationOptions options);
}
