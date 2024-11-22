using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Core.Repositories;

public class PositionRepository(
        SkillhubContext context,
        IPaginationService paginationService)
    :
        BaseRepository<Position>(context),
        IPositionRepository
{
    private readonly IPaginationService _paginationService = paginationService;
    private readonly SkillhubContext _context = context;

    public (IEnumerable<Position>, PaginationInfo) GetPaginated(PaginationOptions options)
    {
        var result = _paginationService.Paginate(GetAllNoTracking(), options);
        return result;
    }

    public async Task<(IEnumerable<Position>, PaginationInfo)> GetPaginatedAsync(PaginationOptions options)
    {
        var result = await _paginationService.PaginateAsync(
            GetAllNoTracking(), options);
        return result;
    }
}
