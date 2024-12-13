namespace Api.Domain.Models;

public record ExamDTO(
    int Id,
    string Name,
    string? Description,
    DateOnly? AppliedAt,
    IEnumerable<NewSkillResultDTO> Skills
)
{
    public static ExamDTO Map(Exam obj, IEnumerable<NewSkillResultDTO> skills)
    {
        return new ExamDTO(
            obj.Id,
            obj.Name,
            obj.Description,
            obj.AppliedAt,
            skills
        );
    }
}
