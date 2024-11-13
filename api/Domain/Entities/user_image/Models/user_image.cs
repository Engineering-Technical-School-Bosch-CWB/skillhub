using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class UserImage : IEntity
{
  public required Guid FileGuid { get; set; }
  public required byte[] Image { get; set; }

  public required User User { get; set; }
}
