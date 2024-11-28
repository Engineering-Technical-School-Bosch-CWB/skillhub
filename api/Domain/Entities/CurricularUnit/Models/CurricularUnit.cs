using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class CurricularUnit : IEntity
{
  public required string Name { get; set; }
  public required SubjectArea SubjectArea { get; set; }
  public bool IsActive { get; set; } = true;
  public ICollection<Skill> Skills { get; set; } = [];
  public ICollection<Subject> Subjects { get; set; } = [];
}
