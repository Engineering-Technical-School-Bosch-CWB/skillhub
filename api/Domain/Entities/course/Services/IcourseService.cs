using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ICourseService : IService<Course>
{
    public Task<AppResponse<CourseDTO>> CreateCourse(CourseCreatePayload payload);
    public Task DeleteCourse(int id);
    public Task<PaginatedAppResponse<CourseDTO>> GetCourses(PaginationQuery options);
    public Task<AppResponse<CourseDTO>> GetCourseById(int id);
    public Task<AppResponse<CourseDTO>> UpdateCourse(int id, CourseUpdatePayload payload);
}
