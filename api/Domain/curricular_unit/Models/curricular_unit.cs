using Genesis.Domain.Models;

namespace api.Domain.Models;

public partial class CurricularUnit : IEntity
{
  public string Name { get; set; }
  public double Duration { get; set; }
  public bool IsActive { get; set; }
  public int CourseId { get; set; }
  public int SubjectAreaId { get; set; }
}
