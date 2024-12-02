using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;
public class SkillCreatePayload
{
    [Required]
    [StringLength(255)]
    public required string Description { get; set; }
    public required string EvaluationCriteria { get; set; }

    [Required]
    public required int CurricularUnitId { get; set; }
}

public class SkillUpdatePayload
{
    [StringLength(255)]
    public string? Description { get; set; }
    public string? EvaluationCriteria { get; set; }
    public int? CurricularUnitId { get; set; }
}