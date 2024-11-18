using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ICourseService : IService<Course>
{
    public Task<CourseCreatedOutbound> CreateCourse(CourseCreatePayload payload);
    public Task<CourseCreatedOutbound> DeleteCourse(int id);
    public Task<CourseCreatedOutbound> GetCourses();
    public Task<CourseCreatedOutbound> GetCourseById(int id);
    public Task<CourseUpdatedOutbound> UpdateCourse(int id, CourseUpdatePayload payload);
}
