using Genesis.Domain.Services;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Domain.Services;

public interface ICourseService : IService<Course>
{
    public Task<CourseResponse> CreateCourse(CourseCreatePayload payload);
    public Task DeleteCourse(int id);
    public Task<CoursePaginationResponse> GetCourses(PaginationOptions options);
    public Task<CourseResponse> GetCourseById(int id);
    public Task<CourseResponse> UpdateCourse(int id, CourseUpdatePayload payload);
}
