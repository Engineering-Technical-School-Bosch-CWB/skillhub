using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Class : IEntity
{
  public required Course Course { get; set; }
  public short StartingYear { get; set; }
  public short DurationPeriods { get; set; }
  public bool IsActive { get; set; }
  public required IEnumerable<Subject> Subjects { get; set; } = [];
}
