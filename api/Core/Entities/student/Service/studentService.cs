using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class StudentService(
    BaseRepository<Student> repository,
    IUserRepository userRepository,
    IClassRepository classRepository
    ) : BaseService<Student>(repository), IStudentService

{
    private readonly IUserRepository _userRepo = userRepository;
    private readonly IClassRepository _classRepo = classRepository;
    public async Task<AppResponse<StudentDTO>> CreateStudent(StudentCreatePayload payload)
    {
        var user = await _userRepo.GetAllNoTracking()
            .SingleOrDefaultAsync(u => u.Id == payload.UserId)
            ?? throw new NotFoundException("User not found.");

        var studentclass = await _classRepo.GetAllNoTracking()
            .SingleOrDefaultAsync(c => c.Id == payload.ClassId)
            ?? throw new NotFoundException("Class not found.");

        var newStudent = new Student{
            User = user,
            Class = studentclass
        };

        var createdStudent = repository.Add(newStudent)
            ?? throw new UpsertFailException("Student could not be inserted.");

        await repository.SaveAsync();

        return new AppResponse<StudentDTO>(
            StudentDTO.Map(createdStudent),
            "Student created successfully!"
        );
    }
}
