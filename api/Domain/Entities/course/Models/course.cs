using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Course : IEntity
{
  public required OccupationArea DefaultOccupationArea { get; set; }
  public required string Name { get; set; }
  public string? Abbreviation { get; set; }
  public bool IsActive { get; set; } = true;
  public ICollection<Class> Classes { get; set; } = [];
}
