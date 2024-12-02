namespace Api.Domain.Models;

public record SkillDTO(
    string Description,
    string? EvaluationCriteria,
    CurricularUnitDTO CurricularUnit
)
{
    public static SkillDTO Map(Skill obj)
    {
        return new SkillDTO(
            obj.Description,
            obj.EvaluationCriteria,
            CurricularUnitDTO.Map(obj.CurricularUnit)
        );
    }
}