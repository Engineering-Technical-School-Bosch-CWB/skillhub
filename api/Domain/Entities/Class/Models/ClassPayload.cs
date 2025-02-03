using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;
public class ClassCreatePayload
{
    public ClassOnCreate Class { get; set; }
    public CourseOnCreateClass Course { get; set; }
    public IEnumerable<StudentOnCreateClass> Students { get; set; }
    public IEnumerable<SubjectOnCreateClass> Subjects { get; set; }
    public bool IsTemplate { get; set; } = false;
}

public class CourseOnCreateClass 
{
    [Required]
    public required string Name { get; set; }
    [Required]
    public required int Id {  get; set; }
}

public class StudentOnCreateClass
{
    [Required]
    public required string Name { get; set; }
    [Required]
    public required string Identification { get; set; }
}
public class SubjectOnCreateClass
{
    [Required]
    public required string Name { get; set; }
    [Required]
    public required int Duration { get; set; }
    [Required]
    public required int CurricularUnitId { get; set; }
}

public class ClassOnCreate
{
    [Required]
    public required string Name { get; set; }
    [Required]
    public required string Abbreviation { get; set; }

    public required short Period { get; set; }
}