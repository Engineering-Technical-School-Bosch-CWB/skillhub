using System.ComponentModel.DataAnnotations;
using Api.Core.Services;
using Api.Domain.Enums;

namespace Api.Domain.Models;

public class SkillResultCreatePayload
{
    [Required]
    public required double Weight { get; set; }

    [Required]
    public required int SkillId { get; set; }

    [Required]
    public required int StudentId { get; set; }

    public short? Aptitude { get; set; }
    public DateTime? EvaluatedAt { get; set; }

    [ExactlyOne(nameof(SubjectId), nameof(ExamId), nameof(ObjectionId))]
    public int? SubjectId { get; set; }
    public int? ExamId { get; set; }
    public int? ObjectionId { get; set; }
}

public class SkillResultEvaluatePayload
{
    [Required]
    public required int SkillId { get; set; }

    public EAptitude? Aptitude { get; set; }
}