using Api.Core.Errors;
using Api.Domain.Models;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;
using Microsoft.EntityFrameworkCore;

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

    public async Task<AppResponse<EventTypeDTO>> DeleteEventType(int Id)
    {
        // Talvez sofra alterações, necessita de uma reunião
        var EventType = await _repo.Get()
        .Where(et => et.IsActive)
        .Include(et => et.Events)
           .ThenInclude(e => e.ClassEvents)
           
        .SingleOrDefaultAsync(et => et.Id == Id)
         ?? throw new NotFoundException("EventType not found!");

        EventType.IsActive = false;
        var deletedEventType = _repo.Update(EventType)
            ?? throw new DeleteFailException("Exam could not be deleted!");

        await _repo.SaveAsync();
            return new AppResponse<EventTypeDTO>(
            EventTypeDTO.Map(EventType),
            "Event Type deleted successfully!"
        );
    }

    public async Task<AppResponse<IEnumerable<EventTypeDTO>>> GetEventTypes()
    {
        IEnumerable<EventTypeDTO> EventTypes = [];
        var EventType = await _repo.GetAllNoTracking().ToListAsync();
        foreach (var et in EventType)
        {
            EventTypes = EventTypes.Append(EventTypeDTO.Map(et));
        }

        return new AppResponse<IEnumerable<EventTypeDTO>>(
            EventTypes,
            "Events updated successfully!"
        );
    }
    public async Task<AppResponse<EventTypeDTO>> UpdateEventType(int id, EventTypeUpdatePayload payload)
    {
        var EventType = await _repo.Get()
        .Where(et => et.IsActive)
        .Include(et => et.Events)   
        .SingleOrDefaultAsync(et => et.Id == id)
         ?? throw new NotFoundException("EventType not found!");

            EventType.Name = payload.Name ?? EventType.Name;
            EventType.Icon = payload.Icon ?? EventType.Icon;
            EventType.Disable_day = payload.Disable ?? EventType.Disable_day;
            EventType.Saturday = payload.Saturday ?? EventType.Saturday;
            EventType.All_day = payload.Allday ?? EventType.All_day;
            EventType.All_classes = payload.AllClasses ?? EventType.All_classes;
            EventType.Color = payload.Color ?? EventType.Color;

        var updatedEventType = _repo.Update(EventType);
        await _repo.SaveAsync();

            return new AppResponse<EventTypeDTO>(
            EventTypeDTO.Map(EventType),
            "Event Type updated successfully!"
        );
    }
}
