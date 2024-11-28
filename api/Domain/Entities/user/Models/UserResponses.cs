namespace Api.Domain.Models;

public record UserResultDTO(
    SubjectDTO Subject,
    double? Score
) { }

public record UserResultResponse(
    int UserId,
    double? OverallScore,
    double? OverallSkillScore,
    IEnumerable<UserResultDTO> UserResults
)
{
    public static UserResultResponse Map(int userId, StudentDTO student, IEnumerable<UserResultDTO> userResults)
    {
        return new UserResultResponse(
            userId,
            student.OverallScore,
            student.OverallSkillScore,
            userResults
        );
    }
}
