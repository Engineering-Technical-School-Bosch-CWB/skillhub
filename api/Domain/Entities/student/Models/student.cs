using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Student : IEntity
{
  public double OverallScore { get; set; }
  public double OverallSkillScore { get; set; }
  public bool IsActive { get; set; } = true;

  public required User User { get; set; }
  public required Class Class { get; set; }
  public ICollection<Feedback> Feedbacks { get; set; } = [];
}
