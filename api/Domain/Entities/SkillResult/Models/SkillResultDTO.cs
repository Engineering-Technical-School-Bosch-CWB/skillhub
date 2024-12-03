using Api.Domain.Enums;

namespace Api.Domain.Models;

public record SkillResultDTO(
    int Id,
    string Description,
    EAptitude Aptitude,
    string ClassPercentageAptitude
)
{
    public static SkillResultDTO Map(SkillResult obj, double? classPercentageAptitude)
    {
        return new SkillResultDTO(
            obj.Id,
            obj.Skill.Description,
            (EAptitude)obj.Aptitude!,
            classPercentageAptitude.HasValue ? Math.Round(classPercentageAptitude.Value, MidpointRounding.AwayFromZero) + "%" : "--"
        );
    }
}