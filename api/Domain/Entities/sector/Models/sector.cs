using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Sector : IEntity
{
  public string Name { get; set; }
  public bool IsActive { get; set; }

  public IEnumerable<User> Users { get; set; } = [];
}
