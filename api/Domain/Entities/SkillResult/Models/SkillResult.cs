using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class SkillResult : IEntity
{
  public float? Aptitude { get; set; }
  public required float Weight { get; set; }
  public required DateOnly EvaluatedAt { get; set; }
  public bool IsActive { get; set; } = true;
  public Subject? Subject { get; set; }
  public Exam? Exam { get; set; }
  public required Skill Skill { get; set; }
  public required Student Student { get; set; }
  public IEnumerable<Objection> Objections { get; set; } = [];
}
