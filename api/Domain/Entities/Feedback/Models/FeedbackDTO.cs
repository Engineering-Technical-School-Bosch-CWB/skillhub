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

public record SimpleFeedbackDTO(
    int? Id,
    string? Content,
    DateOnly? UpdatedAt,
    string? Instructor,
    SimpleStudentDTO Student
)
{
    public static SimpleFeedbackDTO Map(Feedback? obj, Student student)
    {
        return new SimpleFeedbackDTO(
            obj?.Id,
            obj?.Content,
            obj?.UpdatedAt,
            obj?.Instructor.Name,
            SimpleStudentDTO.Map(student)
        );
    }
}

public record CompleteFeedbackDTO(
    int Id,
    string Content,
    DateOnly UpdatedAt,
    string Instructor,
    int InstructorId,
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
            obj .Instructor.Id,
            obj.Subject?.CurricularUnit.Name
        );
    }
}