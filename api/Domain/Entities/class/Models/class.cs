using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Class : IEntity
{
  public required string Name { get; set; }
  public required Course Course { get; set; }
  public required short StartingYear { get; set; }
  public required short DurationPeriods { get; set; }
  public bool IsActive { get; set; } = true;
  public ICollection<Subject> Subjects { get; set; } = [];
  public ICollection<Student> Students { get; set; } = [];
}
