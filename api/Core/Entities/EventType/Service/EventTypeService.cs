using Api.Core.Errors;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class EventTypeService(BaseRepository<EventType> repository, IEventRepository eventRepository, IEventMemberRepository eventMemberRepository, IClassEventRepository classEventRepository) : BaseService<EventType>(repository), IEventTypeService
{

    private readonly BaseRepository<EventType> _repo = repository;
    private readonly IEventRepository _eventRepo = eventRepository;
    private readonly IEventMemberRepository _eventMemberRepo = eventMemberRepository;
    private readonly IClassEventRepository _classEventRepo = classEventRepository;


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
            "Event Type created successfully!"
        );
    }

    public async Task DeleteEventType(int Id)
    {
        var EventType = await _repo.Get()
            .Include(_eventType => _eventType.Events)
            .SingleOrDefaultAsync(_eventType => _eventType.Id == Id)
            ?? throw new NotFoundException("EventType not found!");

        EventType.IsActive = false;

        foreach (var eventType in EventType.Events)
        {
            var Event  = await _eventRepo.Get()
                .Include(_event => _event.EventMembers)
                .Include(_event => _event.ClassEvents)
                .SingleOrDefaultAsync(_event => _event.Id == eventType.Id)
                 ?? throw new NotFoundException("EventType not found!");

            Event.Is_active = false;

            foreach (var classEvents in Event.ClassEvents)
            {
                var ClassEvent  = await _classEventRepo.Get()
                    .SingleOrDefaultAsync(_classEvent => _classEvent.Id == classEvents.Id)
                    ?? throw new NotFoundException("ClassEvent not found!");

                ClassEvent.IsActive = false;
                var deletedClassEvent = _classEventRepo.Update(ClassEvent)
                    ?? throw new DeleteFailException("Class Event could not be deleted!");
            }

            foreach (var eventMember in Event.EventMembers)
            {
                var EventMember  = await _eventMemberRepo.Get()
                    .SingleOrDefaultAsync(_eventMember => _eventMember.Id == eventMember.Id)
                    ?? throw new NotFoundException("EventMember not found!");

                EventMember.IsActive = false;
                var deletedClassEvent = _eventMemberRepo.Update(EventMember)
                    ?? throw new DeleteFailException("Event Member could not be deleted!");
            }
        }


        var deletedEventType = _repo.Update(EventType)
            ?? throw new DeleteFailException("Exam could not be deleted!");

        await _repo.SaveAsync();
    }

    public async Task<AppResponse<IEnumerable<EventTypeDTO>>> GetEventTypes()
    {
        IEnumerable<EventTypeDTO> EventTypes = [];
        var EventType = await _repo.Get()
            .Where(_eventType => _eventType.IsActive)
            .ToListAsync();
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
            .Include(_eventType => _eventType.Events)   
            .SingleOrDefaultAsync(_eventType => _eventType.Id == id)
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
