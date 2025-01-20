using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Repositories;

public class CourseRepository: BaseRepository<Course>, ICourseRepository
{
    private readonly IPaginationService _paginationService;

    public CourseRepository(IPaginationService paginationService, SkillhubContext context)
    : base(context)
    {
        _paginationService = paginationService;
    }
    public (IEnumerable<Course>, PaginationInfo?) GetPaginated(PaginationOptions options)
    {
        var result = _paginationService.Paginate(Get().Where(c => c.IsActive).Include(c => c.DefaultOccupationArea), options);
        return result;
    }
    public async Task<(IEnumerable<Course>, PaginationInfo?)> GetPaginatedAsync(PaginationOptions options)
    {
        var result = await _paginationService.PaginateAsync(
            Get().Where(c => c.IsActive).Include(c => c.DefaultOccupationArea), options);
        return result;
    }
}
