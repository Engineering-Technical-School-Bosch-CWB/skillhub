using Api.Core.Errors;
using Api.Domain.Models;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;

namespace Api.Core.Services;

public class EventTypeService(BaseRepository<EventType> repository) : BaseService<EventType>(repository), IEventTypeService
{

    private readonly BaseRepository<EventType> _repo = repository;

    public async Task<AppResponse<EventTypeDTO>> CreateEventType(EventTypeCreatePayload payload)
    {
        var newEventType = new EventType(){
            Name = payload.Name,
            All_day = payload.Allday,
            Saturday = payload.Saturday,
            Disable_day = payload.Disable,
            All_classes = payload.AllClasses,
            Icon = payload.Icon,
            Color = payload.Color,
        };

        var createdEventType = _repo.Add(newEventType)
            ?? throw new UpsertFailException("Event Type could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<EventTypeDTO>(
            EventTypeDTO.Map(createdEventType),
            "Exam created successfully!"
        );
    }

    public Task<AppResponse<EventTypeDTO>> DeleteEventType(int Id)
    {
        throw new NotImplementedException();
    }

    public Task<AppResponse<EventTypeDTO>> GetEventTypes(EventTypeCreatePayload payload)
    {
        
        throw new NotImplementedException();
    }

    public Task<AppResponse<EventTypeDTO>> UpdateEventType(EventTypeCreatePayload payload)
    {
        throw new NotImplementedException();
    }
}
