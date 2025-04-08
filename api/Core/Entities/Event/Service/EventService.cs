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
            .SingleOrDefaultAsync(_eventType => _eventType.Id == payload.EventTypeId) ??
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
                              .SingleOrDefaultAsync(_user => _user.Id == memberPayload.UserId) ??
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


        if (payload.Classes_id != null)
        {
            foreach (var id_class in payload.Classes_id)
            {
              
                var Class = await _classRepo.Get()
                              .SingleOrDefaultAsync(_class => _class.Id == id_class) ??
                throw new NotFoundException("Class not found!");

                if (payload.Subject_id != null){
                    var subject = await _subjectRepo.Get()
                        .SingleOrDefaultAsync(_subject => _subject.Id == payload.Subject_id ) ??
                    throw new NotFoundException("Subject not found!");
                    var ClassEvent = new ClassEvent(){
                        Subject = subject,
                        Class = Class,
                        Event = Event
                    };
                    var createdClassEvent = _classEventRepo.Add(ClassEvent)
                        ?? throw new UpsertFailException("Class Event could not be inserted!");
                }
            }
        }
        await _repo.SaveAsync();
        return new AppResponse<EventDTO>(
            EventDTO.Map(Event),
            "Event created successfully!"
        );
    }


    public async Task DeleteEvent(int id)
    {
        var Event = await _repo.Get()
            .Where(_event => _event.Is_active)
            .Include(_event => _event.ClassEvents)
            .Include(_event => _event.EventMembers)
            .SingleOrDefaultAsync(_event => _event.Id == id)
         ?? throw new NotFoundException("Event not found!");

        Event.Is_active = false;

        var deletedEvent = _repo.Update(Event)
            ?? throw new DeleteFailException("Event could not be deleted!");

        foreach (var ClassEvent in Event.ClassEvents)
        {
            var classEvent  = await _classEventRepo.Get()
                .SingleOrDefaultAsync(_classEvent => _classEvent.Id == ClassEvent.Id)
                 ?? throw new NotFoundException("EventType not found!");
            
            classEvent.IsActive = false;
            var deletedClassEvent = _classEventRepo.Update(ClassEvent)
                ?? throw new DeleteFailException("Class Event could not be deleted!");
        }

        foreach (var EventMember in Event.EventMembers)
        {
                var eventMember  = await _eventMemberRepo.Get()
                    .SingleOrDefaultAsync(_eventMember => _eventMember.Id == EventMember.Id)
                    ?? throw new NotFoundException("EventMember not found!");

                eventMember.IsActive = false;
                var deletedClassEvent = _eventMemberRepo.Update(eventMember)
                    ?? throw new DeleteFailException("Event Member could not be deleted!");
        }

        await _repo.SaveAsync();
    }

    public async Task<AppResponse<IEnumerable<EventDTO>>> UpdateEvent(IEnumerable<EventUploadPayload> payload)
    {
        IEnumerable<EventDTO> Events = [];
        foreach (var e in payload)
        {
            var Event = await _repo.Get()
            .Where(_event => _event.Is_active)
            .Include(_event => _event.EventType)
            .Include(_event => _event.ClassEvents)
            .Include(_event => _event.EventMembers)
            .SingleOrDefaultAsync(_event => _event.Id == e.Id)
            ?? throw new NotFoundException("Event not found!");

            Event.Name = e.Name ?? Event.Name;
            Event.Description = e.Description ?? Event.Description;
            Event.Movable = e.Movable ?? Event.Movable;
            Event.Start_date = e.Start_date ?? Event.Start_date;
            Event.Start_date = e.Start_date ?? Event.Start_date;
            Event.End_date = e.End_date ?? Event.End_date;
            Event.EventMembers = e.Members?.ToList() ?? Event.EventMembers;

            foreach (var ce in Event.ClassEvents)
            {

                // Assim que criado a parte de ClassEvent, adicionar aqui
                if(!e.Classes_id.Contains(ce.Class.Id))
                {
                    // await DeleteEvent(ce.Classe.Id);
                }
                else if(e.Classes_id.Contains(ce.Class.Id)){}
                else
                {
                    // Criação de uma nova ClassEvent com subject id nulo também
                }
            }
            Events = Events.Append(EventDTO.Map(Event));
            var UpdateEvent = _repo.Update(Event);
        }
        await _repo.SaveAsync();
        return new AppResponse<IEnumerable<EventDTO>>(
            Events,
            "Events updated successfully!"
        );
        
    }
}
