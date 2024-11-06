using Genesis.Domain.Models;

namespace api.Domain.Models;

public partial class Result : IEntity
{
  public string Feedback { get; set; }
  public byte Aptitude { get; set; }
  public bool IsActive { get; set; }
  public int CompetenceId { get; set; }
}
