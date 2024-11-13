using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Course : IEntity
{
  public string Name { get; set; } = string.Empty;
  public string Abbreviation { get; set; } = string.Empty;

  public required IEnumerable<Class> Classes { get; set; }
}
