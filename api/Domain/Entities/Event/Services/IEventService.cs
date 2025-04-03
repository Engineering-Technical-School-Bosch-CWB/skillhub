using Api.Domain.Models;
using Genesis.Domain.Services;

namespace Api.Domain.Services;

public interface IEventService : IService<Event>
{
    public Task<AppResponse<EventDTO>> CreateEvent (EventCreatePayload payload);

    public Task<AppResponse<EventDetailsDTO>> GetEventDetail (int id);
}