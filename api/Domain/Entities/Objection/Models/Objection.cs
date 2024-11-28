using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Objection : IEntity
{
    public required double ClaimedAptitude { get; set; }
    public required double OfficialAptitude { get; set; }
    public required DateOnly ObjectedAt { get; set; }
    public bool IsAccepted { get; set; } = false;
    public bool IsActive { get; set; } = true;
    public required SkillResult SkillResult { get; set; }
}