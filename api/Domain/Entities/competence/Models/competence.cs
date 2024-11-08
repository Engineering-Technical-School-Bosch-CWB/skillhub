using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Competence : IEntity
{
  public string Description { get; set; }
  public bool IsActive { get; set; }
  public int SubjectId { get; set; }
}
