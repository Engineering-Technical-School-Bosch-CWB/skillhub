using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Class : IEntity
{
  public short StartingYear { get; set; }
  public short DurationPeriods { get; set; }
  public bool IsActive { get; set; }

  public required Course Course { get; set; }

  public IEnumerable<User> Users { get; set; } = [];
  public IEnumerable<Student> Students { get; set; } = [];
}
