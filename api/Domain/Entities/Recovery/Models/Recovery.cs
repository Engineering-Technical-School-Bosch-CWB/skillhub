using Api.Domain.Enums;
using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Recovery : IEntity
{
  public required Student Student { get; set; }
  public required SkillResult SkillResult { get; set; }
  public EStatus Status { get; set; } = EStatus.Pending;
}
