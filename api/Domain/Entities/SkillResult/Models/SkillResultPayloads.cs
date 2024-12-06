using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class SkillResultCreatePayload
{
    public short? Aptitude { get; set; }

    [Required]
    public required double Weight { get; set; }

    [Required]
    public required DateTime EvaluatedAt { get; set; }
}
