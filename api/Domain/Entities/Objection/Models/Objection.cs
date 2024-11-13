using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Objection : IEntity
{
    public required float ClaimedAptitude { get; set; }
    public required float OfficialAptitude { get; set; }
    public bool IsAccepted { get; set; } = false;
    public bool IsActive { get; set; } = true;
    public required DateOnly ObjectedAt { get; set; }
    public required SkillResult SkillResult { get; set; }
}