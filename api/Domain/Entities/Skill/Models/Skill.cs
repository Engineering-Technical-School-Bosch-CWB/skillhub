using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Skill : IEntity
{
  public required string Description { get; set; }
  public string? EvaluationCriteria { get; set; }
  public bool IsActive { get; set; } = true;
  public required CurricularUnit CurricularUnit { get; set; }
}