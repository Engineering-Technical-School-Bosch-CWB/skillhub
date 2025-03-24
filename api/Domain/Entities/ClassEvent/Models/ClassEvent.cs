using Genesis.Domain.Models;

namespace Api.Domain.Models;

public class ClassEvent : IEntity
{
    public Subject? Subjects { get; set; }
    public required Class Classes { get; set; }
    public required Event Events { get; set; }
}