using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;
public class ClassCreatePayload
{
    [Required]
    public required string Name { get; set; }

    [Required]
    public required int CourseId { get; set; }

    [Required]
    public required short StartingYear { get; set; }

    [Required]
    public required short DurationPeriods { get; set; }
}
