using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IEventTypeService : IService<EventType>
{
    public Task<AppResponse<EventTypeDTO>> CreateEventType(EventTypeCreatePayload payload);
    public Task<AppResponse<IEnumerable<EventTypeDTO>>> GetEventTypes();
    public Task<AppResponse<EventTypeDTO>> UpdateEventType(int id, EventTypeUpdatePayload payload);
    public Task<AppResponse<EventTypeDTO>> DeleteEventType(int Id);
}
