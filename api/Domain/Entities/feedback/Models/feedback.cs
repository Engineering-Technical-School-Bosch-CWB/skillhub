using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Feedback : IEntity
{
<<<<<<< HEAD
  public string Content { get; set; }
  public System.DateTime CreatedAt { get; set; }
  public bool IsActive { get; set; }
  public int StudentId { get; set; }
  public int InstructorId { get; set; }
=======
  public required User Instructor { get; set; }
  public required Student Student { get; set; }
  public Subject? Subject { get; set; }
  public required string Content { get; set; }
  public required DateOnly CreatedAt { get; set; }
  public required bool StudentMayVisualize { get; set; }
  public bool IsActive { get; set; } = true;
>>>>>>> dev
}
