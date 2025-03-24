using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class CalendarType : IEntity 
{
    public required string Name { get; set; }
    public ICollection<EventType> EventTypes { get; set; } = [];
    public ICollection<Calendar> Calendars { get; set; } = [];
}