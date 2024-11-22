using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;
public class ClassCreatePayload()
{
    [Required]
    public required int CourseId { get; set; }

    [Required]
    public required DateOnly StartingYear { get; set; }

    [Required]
    public required short DurationPeriods { get; set; }
}
