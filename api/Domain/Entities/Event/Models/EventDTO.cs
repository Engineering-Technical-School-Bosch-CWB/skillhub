namespace Api.Domain.Models;

public record EventDTO(
    int Id,
    string Name,
    string? Description,
    int EventTypeId
){
    public static EventDTO Map(Event obj)
    {
        return new EventDTO(
            obj.Id,
            obj.Name,
            obj.Description,
            obj.EventType.Id
        );
    }
}

public class EventPageDTO(
    EventDTO Event
    // IEnumerable<CalendarDTO> Days,
    // IEnumerable<ClassDTO> Classes,
    // IEnumerable<UserDTO> Instructors
){
    public static EventPageDTO Map(Event obj
    // ,IEnumerable<CalendarDTO> Days,
    // IEnumerable<ClassDTO> Classes,
    // IEnumerable<UserDTO> Instructors
    ){
        return new EventPageDTO(
            EventDTO.Map(obj)
            // ,Days,
            // Classes,
            // Instructors
        );
    }
}