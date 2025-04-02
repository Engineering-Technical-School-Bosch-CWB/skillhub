using Genesis.Domain.Models;

namespace Api.Domain.Models;

public partial class Subject : IEntity
{
  public required CurricularUnit CurricularUnit { get; set; }
  public required Class Class { get; set; }
  public required double DurationHours { get; set; }
  public int? Period { get; set; }
  public bool IsActive { get; set; } = true;
  public User? Instructor { get; set; }
  public DateOnly? BeganAt { get; set; }
    public DateOnly? FinishedAt { get; set; }
  public ICollection<SpecificObjective> SpecificObjectives { get; set; } = [];
  public ICollection<Post> Posts { get; set; } = [];
  public ICollection<Exam> Exams { get; set; } = [];
  public ICollection<StudentResult> Results { get; set; } = [];
  public ICollection<ClassEvent> ClassEvents { get; set; } = [];
}
