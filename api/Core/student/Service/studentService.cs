using Genesis.Core.Services;
using Genesis.Core.Repositories;
using api.Domain.Models;
using api.Domain.Services;

namespace api.Core.Services;

public class StudentService(BaseRepository<Student> repository)
    : BaseService<Student> (repository), IStudentService
{

}
