namespace Api.Domain.Models;

public record StudentDTO(
    double? OverallScore,
    double? OverallSkillScore,
    int ClassId
)
{
    public static StudentDTO Map(Student obj)
    {
        return new StudentDTO(
            obj.OverallScore,
            obj.OverallSkillScore,
            obj.Class.Id
        );
    }
}