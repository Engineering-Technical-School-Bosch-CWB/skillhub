using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class CourseRepository(Project_eContext context) 
    : BaseRepository<Course>(context), ICourseRepository
{

}
