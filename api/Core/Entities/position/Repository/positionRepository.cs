using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Services;

namespace Api.Core.Repositories;

public class PositionRepository(
        SkillhubContext context,
        PaginationService paginationService)
    :
        BaseRepository<Position>(context)
{
    private readonly PaginationService _paginationService = paginationService;

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
