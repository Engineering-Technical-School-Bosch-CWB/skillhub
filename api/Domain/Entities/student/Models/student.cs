using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Student : IEntity
{
  public double Grade { get; set; }
  public string? PersonalFeedback { get; set; }
  public bool IsActive { get; set; }
  public int UserId { get; set; }
  public int ClassId { get; set; }
}
