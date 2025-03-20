namespace Api.Domain.Models;

public record SkillDTO(
    int Id,
    string Description,
    string? EvaluationCriteria,
    int CurricularUnitId,
    double? Weight
)
{
    public static SkillDTO Map(Skill obj, double? weight = null)
    {
        return new SkillDTO(
            obj.Id,
            obj.Description,
            obj.EvaluationCriteria,
            obj.CurricularUnit.Id,
            weight
        );
    }
}

public record SelectSkillDTO(
    bool Selected,
    SkillDTO Skill
)
{ }

public record ExamSkillsDTO(
    SubjectDTO Subject,
    IEnumerable<ObjectDTO> Teachers,
    IEnumerable<SelectSkillDTO> Skills
)
{
    public static ExamSkillsDTO Map(SubjectDTO subjectDTO, IEnumerable<ObjectDTO> teachers, IEnumerable<SelectSkillDTO> skillDTOs)
    {
        return new ExamSkillsDTO(
            subjectDTO,
            teachers,
            skillDTOs
        );
    }
}