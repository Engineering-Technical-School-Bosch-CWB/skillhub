using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Exam : IEntity
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public DateOnly? AppliedAt { get; set; }
    public bool IsActive { get; set; } = true;
    public User? Instructor { get; set; }
    public required Subject Subject { get; set; }
    public ICollection<SkillResult> SkillResults { get; set; } = [];
}
