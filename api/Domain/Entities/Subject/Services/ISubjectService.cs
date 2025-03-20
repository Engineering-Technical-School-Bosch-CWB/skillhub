using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ISubjectService : IService<Subject>
{
    public Task<AppResponse<SubjectDTO>> CreateSubject(SubjectCreatePayload payload);
    public Task<AppResponse<IEnumerable<SubjectDTO>>> CreateSubjectsByClass(IEnumerable<SubjectCreateByClassPayload> payload, int idClass);
    public Task<AppResponse<InstructorSubjectDTO>> GetInstructorPage(int id);
    public Task<PaginatedAppResponse<SubjectDTO>> GetSubjectPaginated(PaginationQuery pagination, int cassId, int? studentId, string? query);
    public Task<AppResponse<SubjectDTO>> UpdateSubject(int id, SubjectUpdatePayload payload);
    public Task DeleteSubject(int id);
}
