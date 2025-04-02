using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IEventTypeService : IService<EventType>
{
    public Task<AppResponse<EventTypeDTO>> CreateEventType(EventTypeCreatePayload payload);
}
