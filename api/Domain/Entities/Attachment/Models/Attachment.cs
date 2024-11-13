using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Attachment : IEntity
{
  public Guid FileGuid { get; set; }
  public required Post Post { get; set; }
  public byte[] Content { get; set; } = [];
  public required string Extension { get; set; } = string.Empty;
  public bool IsActive { get; set; }
}
