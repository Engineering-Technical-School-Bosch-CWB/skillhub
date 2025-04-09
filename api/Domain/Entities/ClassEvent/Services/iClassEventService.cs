
using Api.Domain.Models;
using Genesis.Domain.Services;

namespace Api.Domain.Services;

public interface IClassEventService : IService<ClassEvent>
{
    public Task<AppResponse<ClassEventDTO>> CreateClassEvent(ClassEventPayload payload);
    public Task DeleteClassEvent(int id);
    public Task<IEnumerable<ClassEventDTO>> GetAllByClassIdAsync(int year, int month, int id);
    public Task<IEnumerable<SubjectEventDetails>> GetSubjectsEventsDetailsByClass(int id);
    public Task<AppResponse<CalendarClassPageDTO>> GetClassPage(int year, int month, int id);
}