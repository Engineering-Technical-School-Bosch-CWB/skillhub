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

public record EventDetailsDTO(
    int Id,
    DateTime StartDate,
    DateTime EndDate,
    string Name,
    string? Description,
    bool Movable,
    EventTypeDTO EventType,
    IEnumerable<EventMemberDTO> EventMember,
    IEnumerable<ClassSubjectInfo> Classes
){
    public static EventDetailsDTO Map(Event obj,
    EventType type,IEnumerable<EventMember> members, IEnumerable<ClassEvent> classes){
        return new EventDetailsDTO(
            obj.Id,
            obj.Start_date,
            obj.End_date,
            obj.Name,
            obj.Description,
            obj.Movable,
            EventTypeDTO.Map(type),
            members.Select(s => EventMemberDTO.Map(s)),
            classes.Select(c => ClassSubjectInfo.Map(c))
        );
    }
}