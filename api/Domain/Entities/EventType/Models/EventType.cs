using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class EventType : IEntity 
{
    public required string Name { get; set; }
    public bool IsActive { get; set; }	=  true;
    public bool AllDay { get; set; }
    public bool Saturday { get; set; }
    public bool DisableDay { get; set; }
    public bool AllClasses { get; set; }
    public string Icon { get; set; } = "";
    public string Color { get; set; } = "";
    public ICollection<Event> Events { get; set; } =[];

}