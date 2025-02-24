using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class SubjectCreatePayload
{
    [Required]
    public required int InstructorId { get; set; }

    [Required]
    public required int CurricularUnitId { get; set; }

    [Required]
    public required int ClassId { get; set; }

    [Required]
    public required short Period { get; set; }


    [Required]
    public required double DurationHours { get; set; }

    [Required]
    public required DateOnly BeganAt { get; set; }
}

public class SubjectUpdatePayload
{
    public double? DurationHours { get; set; }
    public short? Period { get; set; }
    public DateOnly? BeganAt { get; set; }
    public int? InstructorId { get; set; }
}


public class SubjectCreateByClassPayload
{
    public int Id { get; set; }
    public string Subject { get; set; }
    [Required]
    public int CurricularUnitId { get; set; }
    [Required]
    public int Time { get; set; }
}