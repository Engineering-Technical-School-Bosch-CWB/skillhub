using Genesis.Domain.Models;

namespace Api.Domain.Models;
public partial class User : IEntity
{
  public required string Name { get; set; }
  public required string Identification { get; set; }
  public required string Hash { get; set; }
  public DateTime Birthday { get; set; }
  public bool IsActive { get; set; }

  public required Position Position { get; set; }
  public required Sector Sector { get; set; }
  public required OccupationArea Area { get; set; }
  public Student? StudentProfile { get; set; }

public ICollection<UserImage> Images { get; set; } = [];
public ICollection<Subject> Subjects { get; set; } = [];

}
