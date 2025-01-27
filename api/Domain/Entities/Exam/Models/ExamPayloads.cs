using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class ExamCreatePayload
{
    [Required]
    [StringLength(50)]
    public required string Name { get; set; }
    public string? Description { get; set; }
    public DateOnly? ApliedAt { get; set; }
    public int? InstructorId { get; set; }

    [Required]
    public required int SubjectId { get; set; }

    [Required]
    public required IEnumerable<NewSkillResultDTO> Skills { get; set; }
}
