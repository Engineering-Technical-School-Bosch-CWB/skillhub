using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;
using api.Domain.Services.Pagination;
using api.Core.Services.Pagination;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Repositories;

public class PositionRepository(
        Project_eContext context,
        PaginationService paginationService)
    :
        BaseRepository<Position>(context),
        IPositionRepository
{
    private readonly PaginationService _paginationService = paginationService;
    private readonly Project_eContext _context = context;

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
