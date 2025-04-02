using System.Drawing;

namespace Api.Domain.Models;

public record EventDTO(
    int Id,
    string Name,
    string? Description,
    bool IsActive,
    bool Movable,
    DateTime Start_date,
    DateTime End_date,
    int EventTypeId
){
    public static EventDTO Map(Event obj)
    {
        return new EventDTO(
            obj.Id,
            obj.Name,
            obj.Description,
            obj.Is_active,
            obj.Movable,
            obj.Start_date,
            obj.End_date,
            obj.EventType.Id
        );
    }
}

public record EventDetailsDTO(
    EventDTO Event,
    EventTypeDTO EventType,
    IEnumerable<EventMembersDetailDTO> Members,
    IEnumerable<ClassDTO> Classes
){
    public static EventDetailsDTO Map(Event obj,
    EventType eventType,
    IEnumerable<ClassDTO> Classes,
    IEnumerable<EventMembersDetailDTO> Members
    ){
        return new EventDetailsDTO(
            EventDTO.Map(obj),
            EventTypeDTO.Map(eventType),
            Members,
            Classes
        );
    }
}


public record EventMembersDetailDTO(
    int Id,
    string Name,
    bool Responsibble
){
        public static EventMembersDetailDTO Map(EventMember obj)
    {
        return new EventMembersDetailDTO(
            obj.Id,
            obj.Member.Name,
            obj.Is_responsible
        );
    }
}