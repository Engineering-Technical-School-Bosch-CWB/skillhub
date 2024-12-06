using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class SkillResult : IEntity
{
  public short? Aptitude { get; set; } = null;
  public required double Weight { get; set; }
  public DateTime? EvaluatedAt { get; set; } = null;
  public bool IsActive { get; set; } = true;
  public Subject? Subject { get; set; } = null;
  public Exam? Exam { get; set; } = null;
  public Objection? Objection { get; set; } = null;
  public required Skill Skill { get; set; }
  public required Student Student { get; set; }
  public ICollection<Objection> Objections { get; set; } = [];
}
