using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class EventMember : IEntity 
{
    public bool Is_responsible { get; set; }
    public required User Member { get; set; }
    public required Event Event { get; set; }

}