using System.Globalization;
using Api.Domain.Enums;

namespace Api.Domain.Models;

public record SkillResultDTO(
    int Id,
    string Description,
    EAptitude? Aptitude,
    string ClassPercentageAptitude
)
{
    public static SkillResultDTO Map(SkillResult obj, double? classPercentageAptitude)
    {
        return new SkillResultDTO(
            obj.Id,
            obj.Skill.Description,
            obj.Aptitude.HasValue ? (EAptitude?)obj.Aptitude.Value : null,
            classPercentageAptitude.HasValue ? Math.Round(classPercentageAptitude.Value, MidpointRounding.AwayFromZero) + "%" : "--"
        );
    }
}

public record SkillResultHistoryDTO(
    int Id,
    string Reason,
    DateOnly? Date,
    EAptitude Aptitude
)
{
    public static SkillResultHistoryDTO Map(SkillResult obj)
    {
        return new SkillResultHistoryDTO(
            obj.Id,
            obj.Exam is not null ? "Exam" : obj.Objection is not null ? "Objection" : "---",
            obj.EvaluatedAt.HasValue ? DateOnly.FromDateTime(obj.EvaluatedAt.Value) : null,
            (EAptitude)obj.Aptitude!
        );
    }
}

public record NewSkillResultDTO(
    int SkillId,
    string? Description,
    double? Weight
)
{
    public static NewSkillResultDTO Map(SkillResult obj)
    {
        return new NewSkillResultDTO(
            obj.Skill.Id,
            obj.Skill.Description,
            obj.Weight
        );
    }
}

public record CompleteSkillResultDTO(
    int Id,
    double Weight,
    EAptitude? Aptitude,
    SkillDTO Skill
)
{
    public static CompleteSkillResultDTO Map(SkillResult obj)
    {
        return new CompleteSkillResultDTO(
            obj.Id,
            obj.Weight,
            obj.Aptitude.HasValue ? (EAptitude?)obj.Aptitude.Value : null,
            SkillDTO.Map(obj.Skill)
        );
    }
}