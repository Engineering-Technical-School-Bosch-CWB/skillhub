using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class UserImage : IEntity
{
  public byte[] Image { get; set; }
  public int UserId { get; set; }
}
