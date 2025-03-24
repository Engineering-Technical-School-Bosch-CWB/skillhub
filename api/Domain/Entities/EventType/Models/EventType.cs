using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class EventType : IEntity 
{
    public required string Name { get; set; }
    public ICollection<CalendarType> CalendarTypes { get; set; } = [];
    public ICollection<Event> Events { get; set; } = [];
}