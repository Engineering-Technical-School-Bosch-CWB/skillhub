using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;
using Api.Domain.Repositories;

namespace Api.Core.Services;

public class CourseService : BaseService<Course>, ICourseService
{
    private readonly IOccupationAreaRepository _areaRepo;
    private readonly ICourseRepository _repo;
    private readonly IPaginationService _pagService;

    public CourseService(
        IOccupationAreaRepository areaRepository,
        BaseRepository<Course> repository,
        IPaginationService pagService
    ) : base(repository)
    {
        _areaRepo = areaRepository;
        _pagService = pagService;
        _repo = repository is ICourseRepository CourseRepository
        ? CourseRepository
        : throw new ServiceConfigurationException(
                nameof(_repo),
                typeof(ICourseRepository),
                repository.GetType()
        );
    }

    public async Task<AppResponse<CourseDTO>> CreateCourse(CourseCreatePayload payload)
    {
        if (await _repo.Get().Where(c => c.IsActive).AnyAsync(c => string.Equals(c.Name, payload.Name)))
            throw new AlreadyExistsException("Course already exists!");

        var area = await _areaRepo.Get()
            .SingleOrDefaultAsync(oa => oa.Id == payload.OccupationAreaId)
            ?? throw new NotFoundException("Occpation area not found!");

        var newCourse = new Course()
        {
            Name = payload.Name,
            Abbreviation = payload.Abbreviation,
            DefaultOccupationArea = area
        };

        var saveCourse = _repo.Add(newCourse)
            ?? throw new UpsertFailException("Course could not be inserted!");
        await _repo.SaveAsync();

        return new AppResponse<CourseDTO>(
            CourseDTO.Map(saveCourse),
            "Course created successfully!"
        );
    }

    public async Task DeleteCourse(int id)
    {
        var course = await _repo.Get()
            .Where(c => c.IsActive)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Course not found!");

        course.IsActive = false;

        var deletedCourse =
            _repo.Update(course)
            ?? throw new DeleteFailException("Course could not be deleted!");

        await _repo.SaveAsync();
    }

    public async Task<AppResponse<CourseDTO>> GetCourseById(int id)
    {
        var course = await _repo.Get()
            .Include(c => c.DefaultOccupationArea)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Course not found!");

        return new AppResponse<CourseDTO>(
            CourseDTO.Map(course),
            "Course found!"
        );
    }

    public PaginatedAppResponse<CourseDTO> GetCourses(PaginationQuery pagination, string? querry = null)
    {
        var entities = _repo.GetAllNoTracking()
            .Where(course => string.IsNullOrEmpty(querry) || EF.Functions.Like(course.Name, $"%{querry}%"))
            .Where(course => course.IsActive)
            .Include(c => c.DefaultOccupationArea);

        var result = _pagService.Paginate(
            entities,
            pagination.ToOptions()
        );

        List<CourseDTO> mappedCourses = [.. result.Item1.Select(c => CourseDTO.Map(c))];

        return new PaginatedAppResponse<CourseDTO>(
            // paginatedCourses.Item1.Select(c => CourseDTO.Map(c)),
            mappedCourses,
            result.Item2!,
            "Courses found!"
        );
    }

    public async Task<AppResponse<CourseDTO>> UpdateCourse(int id, CourseUpdatePayload payload)
    {
        var course = await _repo.Get()
            .Include(c => c.DefaultOccupationArea)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Course not found!");

        if (payload.OccupationAreaId is not null)
        {
            var area = await _areaRepo.Get()
                .SingleOrDefaultAsync(u => u.Id == payload.OccupationAreaId)
                ?? throw new NotFoundException("Occupation area not found!");
            course.DefaultOccupationArea = area;
        }

        if (!string.IsNullOrEmpty(payload.Name) && !string.Equals(payload.Name, course.Name))
        {
            if (await _repo.GetAllNoTracking().Where(c => c.IsActive && c.Id != id).AnyAsync(c => string.Equals(c.Name, payload.Name)))
                throw new AlreadyExistsException("Course already exists!");

            course.Name = payload.Name;
        }

        if (!string.IsNullOrEmpty(payload.Abbreviation) && !string.Equals(payload.Abbreviation, course.Abbreviation))
            course.Abbreviation = payload.Abbreviation;

        var updatedCourse =
            _repo.Update(course)
            ?? throw new UpsertFailException("Course could not be updated!");

        await repository.SaveAsync();

        return new AppResponse<CourseDTO>(
            CourseDTO.Map(updatedCourse),
            "Course updated successfully!"
        );
    }
}
