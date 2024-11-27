using Api.Domain.Models;

namespace Api.Domain.Models;

public record StudentDTO(
    double? OverallScore,
    double? OverallSkillScore,
    int UserId,
    int ClassId
)
{
    public static StudentDTO Map(Student obj)
    {
        return new StudentDTO(
            obj.OverallScore,
            obj.OverallSkillScore,
            obj.User.Id,
            obj.Class.Id
        );
    }
}