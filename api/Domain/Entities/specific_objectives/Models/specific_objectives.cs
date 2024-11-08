using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class SpecificObjectives : IEntity
{
  public string Identification { get; set; }
  public string? Ressources { get; set; }
  public int Time { get; set; }
  public string? EvaluationCriteria { get; set; }
  public bool IsActive { get; set; }
  public int SubjectId { get; set; }
}
