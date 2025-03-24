using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class Calendar : IEntity
{
    public DateTime Day { get; set; }
    public bool Period { get; set; }
    public ICollection<CalendarEvent> CalendarEvents { get; set; } = [];
    public required CalendarType CalendarType { get; set; }
}