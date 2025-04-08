
using Api.Domain.Models;
using Genesis.Domain.Services;

namespace Api.Domain.Services;

public interface IClassEventService : IService<ClassEvent>
{
    public Task<AppResponse<IEnumerable<ClassEventDTO>>> GetByClassId(int id);
    public Task<AppResponse<IEnumerable<SubjectEventDetails>>> GetSubjectsEventsDetailsByClass(int id);
}