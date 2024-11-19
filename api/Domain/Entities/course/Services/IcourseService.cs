using Genesis.Domain.Services;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Domain.Services;

public interface ICourseService : IService<Course>
{
    public Task<CourseCreatedResponse> CreateCourse(CourseCreatePayload payload);
    public Task<CourseDeletedResponse> DeleteCourse(int id);
    public AllCoursesResponse GetCourses(PaginationOptions options);
    public Task<OneCourseResponse> GetCourseById(int id);
    public Task<CourseUpdatedResponse> UpdateCourse(int id, CourseUpdatePayload payload);
}
