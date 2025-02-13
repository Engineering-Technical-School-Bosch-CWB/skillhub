using Api.Domain.Enums;

namespace Api.Domain.Models;

public record CompleteSkillResultDTO(
    int Id,
    int SkillId,
    string Description,
    EAptitude? Aptitude,
    string ClassPercentageAptitude
)
{
    public static CompleteSkillResultDTO Map(SkillResult obj, double? classPercentageAptitude = null)
    {
        return new CompleteSkillResultDTO(
            obj.Id,
            obj.Skill.Id,
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
            obj.Exam is not null ? obj.Exam.Name : obj.Objection is not null ? "Objection" : "---",
            obj.EvaluatedAt.HasValue ? DateOnly.FromDateTime(obj.EvaluatedAt.Value) : null,
            (EAptitude)obj.Aptitude!
        );
    }
}

public record SkillResultDTO(
    int SkillId,
    string? Description,
    double? Weight,
    EAptitude? Aptitude
)
{
    public static SkillResultDTO Map(SkillResult obj)
    {
        return new SkillResultDTO(
            obj.Skill.Id,
            obj.Skill.Description,
            obj.Weight,
            obj.Aptitude.HasValue ? (EAptitude?)obj.Aptitude.Value : null
        );
    }
}

public record SimpleSkillResultDTO(
    int Id,
    int SkillId,
    EAptitude? Aptitude
)
{
    public static SimpleSkillResultDTO Map(SkillResult obj)
    {
        return new SimpleSkillResultDTO(
            obj.Id,
            obj.Skill.Id,
            obj.Aptitude.HasValue ? (EAptitude?)obj.Aptitude.Value : null
        );
    }
}

public record ExamSkillDTO(
    int Id,
    double? Weight,
    string Description,
    string? EvaluationCriteria,
    double? Efficiency
)
{ }

public record ExamEvaluationResultDTO(
    SimpleStudentDTO Student,
    IEnumerable<SkillResultDTO> Results
)
{
    public static ExamEvaluationResultDTO Map(Student student, IEnumerable<SkillResultDTO> results)
    {
        return new ExamEvaluationResultDTO(
            SimpleStudentDTO.Map(student),
            results
        );
    }
}