using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class Event : IEntity
{
    public required string Name { get; set; }
    public string? Description { get; set; }

    public bool IsActive { get; set; }

    public bool Movable { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public ICollection<EventMember> EventMembers {get;set;} = [];

    public ICollection<ClassEvent> ClassEvents {get;set;} = [];
    public required EventType EventType {get;set;}
}