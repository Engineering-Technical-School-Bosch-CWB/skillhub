using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ISubjectAreaService : IService<SubjectArea>
{
    public Task<AppResponse<SubjectAreaDTO>> CreateSubjectArea(SubjectAreaPayload payload);
    public Task<AppResponse<SubjectAreaDTO>> UpdateSubjectArea(int id, SubjectAreaPayload payload);
    public Task DeleteSubjectArea(int id);
    public Task<AppResponse<SubjectAreaDTO>> GetSubjectArea(int id);
    public Task<PaginatedAppResponse<SubjectAreaDTO>> GetAllSubjectAreas(PaginationQuery? pagination);
}
