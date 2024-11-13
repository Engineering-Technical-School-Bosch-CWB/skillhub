using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Position : IEntity
{
  public string Name { get; set; } = string.Empty;
  public bool IsActive { get; set; }

  public IEnumerable<User> Users { get; set; } = [];
}
