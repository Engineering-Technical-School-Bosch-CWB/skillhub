namespace Api.Domain.Models;

public record EventMemberDTO(
    int Id,
    string Name,
    bool Responsible
){
    public static EventMemberDTO Map(EventMember obj){
        return new EventMemberDTO(
            obj.Id,
            obj.Member.Name,
            obj.IsResponsible
        );
    }
}

public record FullEventMemberDTO(
    int Id,
    string Name,
    IEnumerable<EventDetailsDTO> Events
){
    public static FullEventMemberDTO Map(User usr, IEnumerable<Event> events){
        return new FullEventMemberDTO(
            usr.Id,
            usr.Name,
            events.Select(ev => EventDetailsDTO.Map(ev, ev.EventType, ev.EventMembers, ev.ClassEvents))
        );
    }
}
