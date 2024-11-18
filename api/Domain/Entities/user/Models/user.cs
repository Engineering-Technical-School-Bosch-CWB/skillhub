using Genesis.Domain.Models;

namespace Api.Domain.Models;
public partial class User : IEntity
{
  public required string Name { get; set; }
  public required string Identification { get; set; }
  public required string Hash { get; set; }
  public System.DateTime Birthday { get; set; }
  public bool IsActive { get; set; }
  public int PositionId { get; set; }
  public int SectorId { get; set; }
  public int OccupationId { get; set; }

  public required Position Position { get; set; }
  public required Sector Sector { get; set; }
  public required OccupationArea Area { get; set; }
  public Student? StudentProfile { get; set; }

<<<<<<< HEAD
  public IEnumerable<UserImage> Images { get; set; } = [];
  public IEnumerable<Subject> Subjects { get; set; } = [];
}
=======
public ICollection<UserImage> Images { get; set; } = [];
public ICollection<Subject> Subjects { get; set; } = [];

}
>>>>>>> 29683042404f243e97e6082329f82612a3a343f9
