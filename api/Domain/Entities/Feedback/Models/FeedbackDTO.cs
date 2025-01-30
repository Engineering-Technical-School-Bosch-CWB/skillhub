namespace Api.Domain.Models;

public record FeedbackDTO(
    int Id,
    string Content,
    DateOnly UpdatedAt,
    string Instructor
)
{
    public static FeedbackDTO Map(Feedback obj)
    {
        return new FeedbackDTO(
            obj.Id,
            obj.Content,
            obj.UpdatedAt,
            obj.Instructor.Name
        );
    }
}

public record CompleteFeedbackDTO(
    int Id,
    string Content,
    DateOnly UpdatedAt,
    string Instructor,
    string? Subject
)
{
    public static CompleteFeedbackDTO Map(Feedback obj)
    {
        return new CompleteFeedbackDTO(
            obj.Id,
            obj.Content,
            obj.UpdatedAt,
            obj.Instructor.Name,
            obj.Subject?.CurricularUnit.Name
        );
    }
}