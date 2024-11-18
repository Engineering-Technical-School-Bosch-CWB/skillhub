using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Sector : IEntity
{
  public string Name { get; set; } = string.Empty;
  public bool IsActive { get; set; }

  public ICollection<User> Users { get; set; } = [];
}
