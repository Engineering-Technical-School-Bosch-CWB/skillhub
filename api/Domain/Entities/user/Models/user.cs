using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class User : IEntity
{
  public string Name { get; set; } = string.Empty;
  public string Identification { get; set; } = string.Empty;
  public string Hash { get; set; } = string.Empty;
  public DateTime? Birthday { get; set; }
  public bool IsActive { get; set; }

  public required Position Position { get; set; }
  public required Sector Sector { get; set; }
  public required OccupationArea Area { get; set; }
  public Student? StudentProfile { get; set; }

  public IEnumerable<UserImage> Images { get; set; } = [];
  public IEnumerable<Subject> Subjects { get; set; } = [];
}
