using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Core.Repositories;

public class UserRepository(SkillhubContext context, IPaginationService paginationService)
    : BaseRepository<User>(context), IUserRepository
{
    private readonly IPaginationService _paginationService = paginationService;
    private readonly SkillhubContext _context = context;

    public (IEnumerable<User>, PaginationInfo?) GetPaginated(PaginationOptions options)
    {
        var result = _paginationService.Paginate(Get().Where(u => u.IsActive), options);
        return result;
    }

    public async Task<(IEnumerable<User>, PaginationInfo?)> GetPaginatedAsync(PaginationOptions options)
    {
        var result = await _paginationService.PaginateAsync(Get().Where(u => u.IsActive), options);
        return result;
    }
}
