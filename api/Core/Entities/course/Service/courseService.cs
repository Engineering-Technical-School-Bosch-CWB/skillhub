using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Core.Services;

<<<<<<< HEAD
public class PostService(BaseRepository<Post> repository)
    : BaseService<Post> (repository), IPostService
{

=======
public class CourseService(BaseRepository<Course> repository)
    : BaseService<Course>(repository), ICourseService
{
    public Task<CourseCreatedOutbound> CreateCourse(CourseCreatePayload payload)
    {
        throw new NotImplementedException();
    }

    public Task<CourseCreatedOutbound> DeleteCourse(int id)
    {
        throw new NotImplementedException();
    }

    public Task<CourseCreatedOutbound> GetCourseById(int id)
    {
        throw new NotImplementedException();
    }

    public Task<CourseCreatedOutbound> GetCourses()
    {
        throw new NotImplementedException();
    }

    public Task<CourseUpdatedOutbound> UpdateCourse(int id, CourseUpdatePayload payload)
    {
        throw new NotImplementedException();
    }
>>>>>>> dev
}
