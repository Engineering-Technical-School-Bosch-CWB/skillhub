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