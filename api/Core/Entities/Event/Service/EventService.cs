using Api.Core.Errors;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class EventService(BaseRepository<Event> repository, IClassEventRepository classEventRepository, IEventMemberRepository eventMemberRepository, IEventTypeRepository eventTypeRepository) : BaseService<Event>(repository), IEventService
{

    private readonly BaseRepository<Event> _repo = repository;

    private readonly IClassEventRepository _classEventRepo = classEventRepository;

    private readonly IEventMemberRepository _eventMemberRepo =  eventMemberRepository;

    private readonly IEventTypeRepository _eventTypeRepo =  eventTypeRepository;


    public Task<AppResponse<EventDTO>> CreateEvent(EventCreatePayload payload)
    {
        throw new NotImplementedException();
    }


    public async Task<AppResponse<EventDetailsDTO>> GetEventDetail(int id)
    {
        var eventData = await _repo.Get().Where(s => s.Is_active)
        .SingleOrDefaultAsync(e => e.Id == id)??
        throw new NotFoundException("Event not found!");
        
        var ClassEvents = await _classEventRepo.Get()
        .Where(ce => ce.Event.Id == id)
        .ToArrayAsync();

        var EventMembers = await _eventMemberRepo.Get()
        .Where(em => em.Event.Id == id)
        .ToArrayAsync();

        
        return new AppResponse<EventDetailsDTO>(
            EventDetailsDTO.Map(eventData, eventData.EventType,EventMembers,ClassEvents),
            "Get completed"
        );
        
    }
}
