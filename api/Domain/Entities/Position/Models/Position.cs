using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Position : IEntity
{
  public required string Name { get; set; } = string.Empty;
  public bool IsActive { get; set; } = true;
  public required short PositionLevel { get; set; } = 0;
  public ICollection<User> Users { get; set; } = [];
}
