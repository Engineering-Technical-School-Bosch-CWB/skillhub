using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class CalendarEvent : IEntity 
{
    public required Calendar Calendar { get; set; }
    public required Event Event { get; set; }
    public string Note { get; set; } = "";
    public bool Movable { get; set; } = true;
}