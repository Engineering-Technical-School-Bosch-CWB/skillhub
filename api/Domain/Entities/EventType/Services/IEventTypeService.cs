using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IEventTypeService : IService<EventType>
{
    public Task<AppResponse<EventTypeDTO>> CreateEventType(EventTypeCreatePayload payload);
    public Task<AppResponse<EventTypeDTO>> GetEventTypes(EventTypeCreatePayload payload);
    public Task<AppResponse<EventTypeDTO>> UpdateEventType(EventTypeCreatePayload payload);
    public Task<AppResponse<EventTypeDTO>> DeleteEventType(int Id);
}
