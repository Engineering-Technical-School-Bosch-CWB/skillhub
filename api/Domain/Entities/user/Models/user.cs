using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class User : IEntity
{
  public string Name { get; set; }
  public string Identification { get; set; }
  public string Hash { get; set; }
  public string Card { get; set; }
  public System.DateTime? Birthday { get; set; }
  public bool IsActive { get; set; }
  public int PositionId { get; set; }
  public int SectorId { get; set; }
  public int OccupationId { get; set; }
}
