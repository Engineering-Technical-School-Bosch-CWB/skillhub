using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class CurricularUnit : IEntity
{
  public string Name { get; set; }
  public double Duration { get; set; }
  public bool IsActive { get; set; }
  public int CourseId { get; set; }
  public int SubjectAreaId { get; set; }
  public IEnumerable<Skill> Skills { get; set; } = [];
  public required IEnumerable<Subject> Subjects { get; set; } = [];
}
