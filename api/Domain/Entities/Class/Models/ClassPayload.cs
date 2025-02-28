using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class ClassUpdatePayload
{
    [StringLength(255)]
    public string? Name { get; set; }

    [StringLength(10)]
    public string? Abbreviation { get; set; }

    public short? DurationPeriods { get; set; }
    public short? StartingYear { get; set; }
}

public class ClassCreatePayload
{
    [Required]
    public required ClassOnCreate Class { get; set; }

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
    public required int Id { get; set; }
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

    public short? DurationPeriods { get; set; }
}