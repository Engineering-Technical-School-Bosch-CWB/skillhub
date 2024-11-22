using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class ClassService(
    BaseRepository<Class> repository,
    ICourseRepository courseRepository
    ) : BaseService<Class>(repository), IClassService
{
    private readonly ICourseRepository _courseRepo = courseRepository;

    public async Task<AppResponse<ClassDTO>> CreateClass(ClassCreatePayload payload)
    {
        var course = await _courseRepo.Get()
            .SingleOrDefaultAsync(c => c.Id == payload.CourseId)
            ?? throw new NotFoundException("Course not found");

        var newClass = new Class {
            Course = course,
            StartingYear = payload.StartingYear,
            DurationPeriods = payload.DurationPeriods
        };

        var createdClass = repository.Add(newClass)
            ?? throw new UpsertFailException("Class could not be inserted.");

        await repository.SaveAsync();

        return new AppResponse<ClassDTO>(
            ClassDTO.Map(createdClass),
            "Class created successfully!"
        );
    }
}
