using Genesis.Domain.Models;

namespace Api.Domain.Models;
public partial class Image : IEntity
{
  public Guid FileGuid { get; set; }
  public bool IsActive { get; set; } = true;
  public byte[] Image_P { get; set; } = [];
  public byte[] Image_M { get; set; } = [];
  public byte[] Image_G { get; set; } = [];

  public Image() {
    FileGuid = new Guid();
  }

}
