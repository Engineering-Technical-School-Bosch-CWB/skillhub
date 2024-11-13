using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Skill : IEntity
{
  public string Description { get; set; } = string.Empty;
  public string? EvaluationCriteria { get; set; }
  public bool IsActive { get; set; }

  public required CurricularUnit CurricularUnit { get; set; }
}