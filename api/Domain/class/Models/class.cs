using Genesis.Domain.Models;

namespace api.Domain.Models;

public partial class Class : IEntity
{
  public string Name { get; set; }
  public bool IsActive { get; set; }
  public int CourseId { get; set; }
}
