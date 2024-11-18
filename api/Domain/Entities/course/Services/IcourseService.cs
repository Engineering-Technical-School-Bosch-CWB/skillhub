using Genesis.Domain.Services;
using Api.Domain.Models;
using api.Domain.Services.Pagination;

namespace Api.Domain.Services;

public interface ICourseService : IService<Course>
{
    public Task<CourseCreatedOutbound> CreateCourse(CourseCreatePayload payload);
    public Task<CourseDeletedOutbound> DeleteCourse(int id);
    public Task<AllCoursesOutbound> GetCourses(PaginationOptions options);
    public Task<OneCourseOutbound> GetCourseById(int id);
    public Task<CourseUpdatedOutbound> UpdateCourse(int id, CourseUpdatePayload payload);
}
