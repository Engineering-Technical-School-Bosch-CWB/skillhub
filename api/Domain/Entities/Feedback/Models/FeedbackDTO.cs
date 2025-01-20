namespace Api.Domain.Models;

public record FeedbackDTO(
    int Id,
    string Content,
    DateOnly CreatedAt,
    string Instructor
)
{
    public static FeedbackDTO Map(Feedback obj)
    {
        return new FeedbackDTO(
            obj.Id,
            obj.Content,
            obj.CreatedAt,
            obj.Instructor.Name
        );
    }
}
