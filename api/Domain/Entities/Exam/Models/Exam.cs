using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Exam : IEntity
{
    public string? Description { get; set; }
    public DateOnly? AppliedAt { get; set; }
    public bool IsActive { get; set; } = true;
    public required User Instructor { get; set; }
    public required Subject Subject { get; set; }
    public required ICollection<SkillResult> SkillResults { get; set; } = [];
}
