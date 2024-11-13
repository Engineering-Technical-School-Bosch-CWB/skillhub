using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class UserImage : IEntity
{
  public Guid FileGuid { get; set; }
  public byte[] Image { get; set; } = [];

  public required User User { get; set; }
}
