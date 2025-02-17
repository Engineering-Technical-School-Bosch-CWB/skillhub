using Genesis.Domain.Models;

namespace Api.Domain.Models;
public partial class StudentResult : IEntity
{
  public required Student Student { get; set; }
  public double? Score { get; set; }
  public double? SkillScore { get; set; }
  public Exam? Exam { get; set; }
  public Subject? Subject { get; set; }
  public bool IsActive { get; set; } = true;
}
