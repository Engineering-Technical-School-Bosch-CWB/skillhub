namespace Api.Domain.Models;

public record SkillDTO(
    int Id,
    string Description,
    string? EvaluationCriteria,
    int CurricularUnitId
)
{
    public static SkillDTO Map(Skill obj)
    {
        return new SkillDTO(
            obj.Id,
            obj.Description,
            obj.EvaluationCriteria,
            obj.CurricularUnit.Id
        );
    }
}