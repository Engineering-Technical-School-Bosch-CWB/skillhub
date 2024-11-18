using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IStudentService : IService<Student>
{
    public Task<StudentCreateOutbound> CreateStudent(StudentCreatePayload payload);
}
