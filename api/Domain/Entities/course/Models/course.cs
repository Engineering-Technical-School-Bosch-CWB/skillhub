using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Course : IEntity
{
<<<<<<< HEAD
  public string Name { get; set; }
  public string Abbreviation { get; set; }
=======
  public required OccupationArea DefaultOccupationArea { get; set; }
  public string Name { get; set; } = string.Empty;
  public string Abbreviation { get; set; } = string.Empty;
  public IEnumerable<Class> Classes { get; set; } = [];
>>>>>>> dev
}
