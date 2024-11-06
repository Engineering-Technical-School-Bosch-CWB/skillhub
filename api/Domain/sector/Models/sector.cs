using Genesis.Domain.Models;

namespace api.Domain.Models;

public partial class Sector : IEntity
{
  public string Name { get; set; }
  public bool IsActive { get; set; }
}
