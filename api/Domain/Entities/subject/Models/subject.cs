using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Subject : IEntity
{
  public required User Instructor { get; set; } 
  public required CurricularUnit CurricularUnit { get; set; } 
  public required Class Class { get; set; }
  public required int Period { get; set; } 
  public bool IsActive { get; set; } = true;
  public required double DurationHours { get; set; } 
  public DateOnly BeganAt { get; set; } 
  public ICollection<SpecificObjectives> SpecificObjectives { get; set; } = [];
  public ICollection<Post> Posts { get; set; } = [];
  public ICollection<Exam> Exams { get; set; } = [];

}
