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

public record ExamSkillsDTO(
    SubjectDTO Subject,
    IEnumerable<SkillDTO> Skills
)
{
    public static ExamSkillsDTO Map(SubjectDTO subjectDTO, IEnumerable<SkillDTO> skillDTOs)
    {
        return new ExamSkillsDTO(
            subjectDTO,
            skillDTOs
        );
    }
}