using Api.Core.Errors;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class EventService(BaseRepository<Event> repository, IClassEventRepository classEventRepository, 
IUserRepository userRepository, IEventTypeRepository eventTypeRepository, 
IEventMemberRepository eventMemberRepository, IClassRepository classRepository, ISubjectRepository subjectRepository) : BaseService<Event>(repository), IEventService
{

    private readonly BaseRepository<Event> _repo = repository;

    private readonly IClassRepository _classRepo = classRepository;

    private readonly ISubjectRepository _subjectRepo = subjectRepository;

    private readonly IClassEventRepository _classEventRepo = classEventRepository;

    private readonly IUserRepository _userRepo = userRepository;

     private readonly IEventMemberRepository _eventMemberRepo = eventMemberRepository;

    private readonly IEventTypeRepository _eventTypeRepo = eventTypeRepository;


    public async Task<AppResponse<EventDTO>> CreateEvent(EventCreatePayload payload)
    {
        var type = await _eventTypeRepo.Get()
        .Where(s => s.Id == payload.EventTypeId)
        .SingleOrDefaultAsync() ??
        throw new NotFoundException("Type not found!");

        var Event = new Event()
        {
            Name = payload.Name,
            Description = payload.Description,
            Movable = payload.Movable,
            Is_active = payload.Is_active,
            Start_date = payload.Start_date,
            End_date = payload.End_date,
            EventType = type
        };

        var createdEvent = _repo.Add(Event)
            ?? throw new UpsertFailException("Event could not be inserted!");

        if (payload.Members != null)
        {
            foreach (var memberPayload in payload.Members)
            {
             
                var user = await _userRepo.Get()
                              .SingleOrDefaultAsync(u => u.Id == memberPayload.UserId) ??
                throw new NotFoundException("user not found!");

                var EventMember = new EventMember(){
                    Event = Event,
                    Member = user,
                    Is_responsible = memberPayload.Is_Responsible,
                };
            var createdEventMember = _eventMemberRepo.Add(EventMember)
            ?? throw new UpsertFailException("EventMember could not be inserted!");
            }
        }

            var subject = await _subjectRepo.Get()
                .SingleOrDefaultAsync(s => s.Id == payload.Subject_id ) ??
            throw new NotFoundException("Subject not found!");

        if (payload.Classes_id != null)
        {
            foreach (var id_class in payload.Classes_id)
            {
              
                var Class = await _classRepo.Get()
                              .SingleOrDefaultAsync(c => c.Id == id_class) ??
                throw new NotFoundException("Class not found!");

                var ClassEvent = new ClassEvent(){
                   Subject = subject,
                   Classe = Class,
                   Event = Event
                };
            var createdClassEvent = _classEventRepo.Add(ClassEvent)
            ?? throw new UpsertFailException("Class Event could not be inserted!");
            }
        }
        await _repo.SaveAsync();
        await _eventMemberRepo.SaveAsync();
        await _classEventRepo.SaveAsync();

        return new AppResponse<EventDTO>(
            EventDTO.Map(Event),
            "Event created successfully!"
        );
    }


    public async Task<AppResponse<EventDetailsDTO>> GetEventDetail(int id)
    {
        var eventData = await _repo.Get().Where(s => s.Is_active)
        .SingleOrDefaultAsync(e => e.Id == id) ??
        throw new NotFoundException("Event not found!");

        var ClassEvents = await _classEventRepo.Get()
        .Where(ce => ce.Event.Id == id)
        .ToArrayAsync();

        var EventMembers = await _eventMemberRepo.Get()
        .Where(em => em.Event.Id == id)
        .ToArrayAsync();


        return new AppResponse<EventDetailsDTO>(
            EventDetailsDTO.Map(eventData, eventData.EventType, EventMembers, ClassEvents),
            "Get completed"
        );

    }
}
