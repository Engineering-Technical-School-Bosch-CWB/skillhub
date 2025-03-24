using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class Event : IEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }

    public ICollection<CalendarEvent> CalendarEvents {get;set;} = [];

    public ICollection<User> InstructorEvents {get;set;} = [];

    public ICollection<ClassEvent> ClassEvents {get;set;} = [];
    public required EventType EventType {get;set;}
}