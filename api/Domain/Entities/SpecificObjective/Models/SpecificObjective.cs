using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class SpecificObjective : IEntity
{
  public required Subject Subject { get; set; }
  public required string Identification { get; set; } = string.Empty;
  public string? Ressources { get; set; } = string.Empty;
  public required int Time { get; set; }
  public string? EvaluationCriteria { get; set; } = string.Empty;
  public required bool IsActive { get; set; }
}
