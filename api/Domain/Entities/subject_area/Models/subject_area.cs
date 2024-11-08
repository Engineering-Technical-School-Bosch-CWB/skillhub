using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class SubjectArea : IEntity
{
  public string Name { get; set; }
  public bool IsActive { get; set; }
}
