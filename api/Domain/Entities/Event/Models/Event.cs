using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class Event : IEntity
{
    public required string Name { get; set; }
    public string? Description { get; set; }

    public bool Is_active { get; set; }

    public bool Movable { get; set; }

    public DateTime Start_date { get; set; }

    public DateTime End_date { get; set; }

    public ICollection<EventMember> EventMembers {get;set;} = [];

    public ICollection<ClassEvent> ClassEvents {get;set;} = [];
    public required EventType EventType {get;set;}
}