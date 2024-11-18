using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Feedback : IEntity
{
  public required User Instructor { get; set; }
  public required Student Student { get; set; }
  public Subject? Subject { get; set; }
  public required string Content { get; set; }
  public required DateOnly CreatedAt { get; set; }
  public required bool StudentMayVisualize { get; set; }
  public bool IsActive { get; set; } = true;
}
