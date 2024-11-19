using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Course : IEntity
{
  public required OccupationArea DefaultOccupationArea { get; set; }
  public string Name { get; set; } = string.Empty;
  public string Abbreviation { get; set; } = string.Empty;
  public bool IsActive { get; set; } = true;
  public ICollection<Class> Classes { get; set; } = [];
}
