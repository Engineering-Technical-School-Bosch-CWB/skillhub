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


    public async Task DeleteEvent(int id)
    {
        var Event = await _repo.Get()
        .Where(e => e.Is_active)
        .Include(e => e.ClassEvents)
        .Include(e => e.EventMembers)
        .SingleOrDefaultAsync(e => e.Id == id)
         ?? throw new NotFoundException("Event not found!");

        Event.Is_active = false;

        var deletedEvent = _repo.Update(Event)
            ?? throw new DeleteFailException("Event could not be deleted!");

        foreach (var ce in Event.ClassEvents)
        {
            ce.IsActive = false;
            var deletedClassEvent = _classEventRepo.Update(ce)
            ?? throw new DeleteFailException("Class Event could not be deleted!");
        }

        foreach (var em in Event.EventMembers)
        {
            em.IsActive = false;
            var deletedEventMember = _eventMemberRepo.Update(em)
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
            .Where(_e => _e.Is_active)
            .Include(_e => _e.ClassEvents)
            .Include(_e => _e.EventMembers)
            .SingleOrDefaultAsync(_e => _e.Id == e.Id)
            ?? throw new NotFoundException("Event not found!");;

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
                if(!e.Classes_id.Contains(ce.Classe.Id))
                {
                    // await DeleteEvent(ce.Classe.Id);
                }
                else if(e.Classes_id.Contains(ce.Classe.Id)){}
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
