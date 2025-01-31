using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ISubjectService : IService<Subject>
{
    public Task<AppResponse<SubjectDTO>> CreateSubject(SubjectCreatePayload payload);
    public Task<AppResponse<InstructorSubjectDTO>> GetInstructorPage(int id);
    public Task<PaginatedAppResponse<SubjectDTO>> GetSubjectPaginated(PaginationQuery pagination, string? query = null);
}
