using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ISubjectService : IService<Subject>
{
    public Task<AppResponse<SubjectDTO>> CreateSubject(SubjectCreatePayload payload);
}
