using Genesis.Domain.Models;

namespace api.Domain.Models;

public partial class Position : IEntity
{
  public string Name { get; set; }
  public bool IsActive { get; set; }
  public int SectorId { get; set; }
  public int OccupationId { get; set; }
}
