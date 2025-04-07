using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class ClassEvent : IEntity
{
    public bool IsActive { get; set;}
    public Subject? Subject { get; set; }
    public required Class Classe { get; set; }
    public required Event Event { get; set; }
}