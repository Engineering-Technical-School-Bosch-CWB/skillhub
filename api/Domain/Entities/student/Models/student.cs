using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Student : IEntity
{
<<<<<<< HEAD
  public double Grade { get; set; }
  public string? PersonalFeedback { get; set; }
  public bool IsActive { get; set; }
  public int UserId { get; set; }
  public int ClassId { get; set; }
=======
  public double OverallScore { get; set; }
  public double OverallSkillScore { get; set; }
  public bool IsActive { get; set; }

  public required User User { get; set; }
  public required Class Class { get; set; }
  public IEnumerable<Feedback> Feedbacks { get; set; } = [];
>>>>>>> dev
}
