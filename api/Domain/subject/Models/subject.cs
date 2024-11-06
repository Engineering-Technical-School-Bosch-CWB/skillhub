using Genesis.Domain.Models;

namespace api.Domain.Models;

public partial class Subject : IEntity
{
  public string Name { get; set; }
  public bool IsActive { get; set; }
  public int InstructorId { get; set; }
  public int CurricularUnitId { get; set; }
  public int ClassId { get; set; }
}
