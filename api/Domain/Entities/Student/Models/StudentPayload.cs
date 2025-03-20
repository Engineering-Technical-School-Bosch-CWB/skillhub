using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;
public class StudentCreatePayload
{
    [Required]
    public required int UserId { get; set; }

    [Required]
    public required int ClassId { get; set; }
}

public class StudentEvaluatePayload
{
    [Required]
    public required int StudentId { get; set; }

    [Required]
    public required IEnumerable<SkillResultEvaluatePayload> Results { get; set; } = [];
}