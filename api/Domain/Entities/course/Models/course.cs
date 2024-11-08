using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Course : IEntity
{
  public string Name { get; set; }
  public string Abbreviation { get; set; }
}
