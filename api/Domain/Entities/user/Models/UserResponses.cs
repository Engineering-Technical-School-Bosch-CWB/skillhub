using Api.Domain.Services;
using Sprache;

namespace Api.Domain.Models;
public record UserResultResponse(
    int UserId,
    double? OverallScore,
    double? OverallSkillScore,
    UserResultDTO Result
)
{
    public static UserResultResponse Map(int userId, Student student, UserResultDTO result)
    {
        return new UserResultResponse(
            userId,
            student.OverallScore,
            student.OverallSkillScore,
            result
        );
    }
}

public record UserResultsResponse(
    int UserId,
    double? OverallScore,
    double? OverallSkillScore,
    IEnumerable<UserResultDTO> Results
)
{
    public static UserResultsResponse Map(int userId, Student student, IEnumerable<UserResultDTO> result)
    {
        return new UserResultsResponse(
            userId,
            student.OverallScore,
            student.OverallSkillScore,
            result
        );
    }
}