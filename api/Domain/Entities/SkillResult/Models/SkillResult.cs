using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class SkillResult : IEntity
{
  public short? Aptitude { get; set; }
  public required double Weight { get; set; }
  public DateTime? EvaluatedAt { get; set; }
  public bool IsActive { get; set; } = true;
  public Subject? Subject { get; set; }
  public Exam? Exam { get; set; }
  public Objection? Objection { get; set; }
  public required Skill Skill { get; set; }
  public required Student Student { get; set; }
  public ICollection<Objection> Objections { get; set; } = [];
}
