using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Core.Repositories;

public class CourseRepository: BaseRepository<Course>, ICourseRepository
{
    private readonly IPaginationService _paginationService;

    public CourseRepository(IPaginationService paginationService, SkillhubContext context)
    : base(context)
    {
        _paginationService = paginationService;
    }
    public async Task<(IEnumerable<Course>, PaginationInfo)> GetPaginatedAsync(PaginationOptions options)
    {
        var result = await _paginationService.PaginateAsync(
            GetAllNoTracking(), options);
        return result;
    }
}
