using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Subject : IEntity
{
<<<<<<< HEAD
  public string Name { get; set; }
  public bool IsActive { get; set; }
  public int InstructorId { get; set; }
  public int CurricularUnitId { get; set; }
  public int ClassId { get; set; }
=======
  public required User Instructor { get; set; } 
  public required CurricularUnit CurricularUnit { get; set; } 
  public required Class Class { get; set; }
  public required int Period { get; set; } 
  public required bool IsActive { get; set; } 
  public required float DurationHours { get; set; } 
  public DateTime BeganAt { get; set; } 
  public IEnumerable<SpecificObjectives> SpecificObjectives { get; set; } = [];
  public IEnumerable<Post> Posts { get; set; } = [];
  public IEnumerable<Exam> Exams { get; set; } = [];

>>>>>>> dev
}
