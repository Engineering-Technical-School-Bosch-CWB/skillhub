using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Post : IEntity
{
  public required Subject Subject { get; set; }
  public required string Title { get; set; } = string.Empty;
  public string? Body { get; set; } = string.Empty;
  public required bool IsActive { get; set; }
  public ICollection<Attachment> Attachments { get; set; } = [];
}
