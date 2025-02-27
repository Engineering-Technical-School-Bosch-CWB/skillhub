using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class ExamCreatePayload
{
    [Required]
    [StringLength(50)]
    public required string Name { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }
    public DateOnly? AppliedAt { get; set; }
    public int? InstructorId { get; set; }

    [Required]
    public required int SubjectId { get; set; }

    [Required]
    public required IEnumerable<SkillResultDTO> Skills { get; set; }
}

public class ExamUpdatePayload
{
    [StringLength(50)]
    public string? Name { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }
    public DateOnly? AppliedAt { get; set; }
    public int? InstructorId { get; set; }
    
    public IEnumerable<SkillResultDTO>? Skills { get; set; }
}