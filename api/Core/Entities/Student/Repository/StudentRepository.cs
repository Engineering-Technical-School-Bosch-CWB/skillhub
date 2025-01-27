using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class StudentRepository(SkillhubContext context) 
    : BaseRepository<Student>(context), IStudentRepository
{

}
