using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class CourseRepository(Project_eContext context) 
    : BaseRepository<Course>(context), ICourseRepository
{

}
