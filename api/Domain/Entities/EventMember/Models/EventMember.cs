using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class EventMember : IEntity 
{
    public bool IsActive { get; set;}
    public bool IsResponsible { get; set; }
    public required User Member { get; set; }
    public required Event Event { get; set; }

}