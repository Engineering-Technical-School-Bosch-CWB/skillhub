using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class EventType : IEntity 
{
    public required string Name { get; set; }
    public bool IsActive { get; set; }	
    public bool All_day { get; set; }
    public bool Saturday { get; set; }
    public bool Disable_day { get; set; }
    public bool All_classes { get; set; }
    public string Icon { get; set; } = "";
    public string Color { get; set; } = "";
    public ICollection<Event> Events { get; set; } =[];

}