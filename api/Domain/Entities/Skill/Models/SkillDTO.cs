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
    IEnumerable<ObjectDTO> Teachers,
    IEnumerable<SkillDTO> Skills
)
{
    public static ExamSkillsDTO Map(SubjectDTO subjectDTO, IEnumerable<ObjectDTO> teachers, IEnumerable<SkillDTO> skillDTOs)
    {
        return new ExamSkillsDTO(
            subjectDTO,
            teachers,
            skillDTOs
        );
    }
}