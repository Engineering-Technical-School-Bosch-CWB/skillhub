namespace Api.Domain.Models;
public record UserResultDTO(
    SubjectDTO Subject,
    double Score
)
{
    public static UserResultDTO Map(SubjectDTO subject, double score)
    {
        return new UserResultDTO(
            subject,
            score
        );
    }
}