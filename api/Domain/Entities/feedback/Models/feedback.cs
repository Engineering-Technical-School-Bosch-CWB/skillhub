using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Feedback : IEntity
{
  public string Content { get; set; }
  public System.DateTime CreatedAt { get; set; }
  public bool IsActive { get; set; }
  public int StudentId { get; set; }
  public int InstructorId { get; set; }
}
