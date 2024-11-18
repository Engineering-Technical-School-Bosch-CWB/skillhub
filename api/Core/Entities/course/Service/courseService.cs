using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;
using Api.Domain.Repositories;
using api.Domain.Services.Pagination;

namespace Api.Core.Services;

public class CourseService(
    BaseRepository<Course> repository,
    IOccupationAreaRepository areaRepository,
    IPaginationService paginationService
)   : BaseService<Course>(repository), ICourseService
{
    private readonly IOccupationAreaRepository _areaRepo = areaRepository;
    private readonly IPaginationService _pagRepo = paginationService;
    public async Task<CourseCreatedOutbound> CreateCourse(CourseCreatePayload payload)
    {
        if (await repository.GetAllNoTracking().AnyAsync(c => c.Name.Equals(payload.Name, StringComparison.OrdinalIgnoreCase)))
            throw new AlreadyExistsException("Name of course already exists.");

        if (await repository.GetAllNoTracking().AnyAsync(c => c.Abbreviation.Equals(payload.Abbreviation, StringComparison.OrdinalIgnoreCase)))
            throw new AlreadyExistsException("Abbreviation of course already exists.");

        var area = await _areaRepo.GetAllNoTracking()
            .SingleOrDefaultAsync(oa => oa.Id == payload.OccupationAreaId)
            ?? throw new NotFoundException("Occpation area not found.");

        var newCourse = new Course()
        {
            Name = payload.Name,
            Abbreviation = payload.Abbreviation,
            DefaultOccupationArea = area
        };

        var saveCourse = repository.Add(newCourse)
            ?? throw new UpsertFailException("Course could not be inserted.");
        await repository.SaveAsync();
        
        return CourseCreatedOutbound.Map(saveCourse, area);
    }

    public async Task<CourseDeletedOutbound> DeleteCourse(int id)
    {
        var course = await repository.GetAllNoTracking()
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Course not found");
        
        course.IsActive = false;

        var deletedCourse =
            repository.Update(course)
            ?? throw new DeleteFailException("Course could not be deleted");

        await repository.SaveAsync();
        
        return new CourseDeletedOutbound()
        {
            Message = "Course successfully deleted"
        };
    }

    public async Task<OneCourseOutbound> GetCourseById(int id)
    {
        var course = await repository.GetAllNoTracking()
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Course not found");

        return OneCourseOutbound.Map(course, "Course found successfully");
    }

    public async Task<AllCoursesOutbound> GetCourses(PaginationOptions options)
    {
        var query = repository.GetAllNoTracking()
            .Include(c => c.DefaultOccupationArea);

        var paginatedCourses = await _pagRepo.Paginate(query, options);

        return AllCoursesOutbound.Map(paginatedCourses, "Courses found successfully");
    }

    public async Task<CourseUpdatedOutbound> UpdateCourse(int id, CourseUpdatePayload payload)
    {
        var course = await repository.GetAllNoTracking()
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Course not found");
        
        if (payload.OccupationAreaId is not null)
        {
            var area = await _areaRepo.GetAllNoTracking()
                .SingleOrDefaultAsync(u => u.Id == payload.OccupationAreaId) 
                ?? throw new NotFoundException("Occupation area not found.");
            course.DefaultOccupationArea = area;
        }

        if (!string.IsNullOrEmpty(payload.Name))
        {
            if (await repository.GetAllNoTracking().AnyAsync(c => c.Name.Equals(payload.Name, StringComparison.OrdinalIgnoreCase)))
            throw new AlreadyExistsException("Name of course already exists.");

            course.Name = payload.Name;
        }

        if (!string.IsNullOrEmpty(payload.Abbreviation))
        {
            if (await repository.GetAllNoTracking().AnyAsync(c => c.Abbreviation.Equals(payload.Abbreviation, StringComparison.OrdinalIgnoreCase)))
                throw new AlreadyExistsException("Abbreviation of course already exists.");
            
            course.Abbreviation = payload.Abbreviation;
        }

        var updatedCourse =
            repository.Update(course)
            ?? throw new UpsertFailException("Course could not be updated.");

        return CourseUpdatedOutbound.Map(updatedCourse);
    }
}
