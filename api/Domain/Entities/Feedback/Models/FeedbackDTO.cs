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
            DateOnly.FromDateTime(obj.UpdatedAt),
            obj.Instructor.Name
        );
    }
}

public record SubjectFeedbackDTO(
    int? Id,
    string? Content,
    DateOnly? UpdatedAt,
    int? InstructorId,
    string? Instructor,
    SimpleStudentDTO Student
)
{
    public static SubjectFeedbackDTO Map(Feedback? obj, Student student)
    {
        return new SubjectFeedbackDTO(
            obj?.Id,
            obj?.Content,
            obj is null ? null : DateOnly.FromDateTime(obj.UpdatedAt),
            obj?.Instructor.Id,
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
    int UserId,
    string? Subject,
    int? SubjectId,
    SimpleStudentDTO Student
)
{
    public static CompleteFeedbackDTO Map(Feedback obj)
    {
        return new CompleteFeedbackDTO(
            obj.Id,
            obj.Content,
            DateOnly.FromDateTime(obj.UpdatedAt),
            obj.Instructor.Name,
            obj.Instructor.Id,
            obj.Student.User.Id,
            obj.Subject?.CurricularUnit.Name,
            obj.Subject?.Id,
            SimpleStudentDTO.Map(obj.Student)
        );
    }
}