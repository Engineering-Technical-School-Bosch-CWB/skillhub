namespace Api.Domain.Models;

public record SkillResponse(
    string CurricularUnit,
    IEnumerable<SkillDTO> Skills
)
{
    public static SkillResponse Map(CurricularUnit curricularUnit, IEnumerable<SkillDTO> skills)
    {
        return new SkillResponse(
            curricularUnit.Name,
            skills
        );
    }
}