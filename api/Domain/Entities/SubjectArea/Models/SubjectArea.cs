using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class SubjectArea : IEntity
{
  public required string Name { get; set; }
  public bool IsActive { get; set; } = true;
  public ICollection<CurricularUnit> CurricularUnits { get; set; } = [];
}
