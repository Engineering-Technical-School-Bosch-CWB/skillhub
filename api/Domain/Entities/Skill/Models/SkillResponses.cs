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

public record SkillHistoryResponse(
    SkillDTO Skill,
    IEnumerable<SkillResultHistoryDTO> ResultHistory
)
{
    public static SkillHistoryResponse Map(SkillDTO skill, IEnumerable<SkillResultHistoryDTO> resultHistory)
    {
        return new SkillHistoryResponse(
            skill,
            resultHistory
        );
    }
}