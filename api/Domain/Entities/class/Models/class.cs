using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Class : IEntity
{
<<<<<<< HEAD
  public string Name { get; set; }
  public bool IsActive { get; set; }
  public int CourseId { get; set; }
=======
  public required Course Course { get; set; }
  public short StartingYear { get; set; }
  public short DurationPeriods { get; set; }
  public bool IsActive { get; set; }
  public IEnumerable<Subject> Subjects { get; set; } = [];
  public IEnumerable<Student> Students { get; set; } = [];
>>>>>>> dev
}
