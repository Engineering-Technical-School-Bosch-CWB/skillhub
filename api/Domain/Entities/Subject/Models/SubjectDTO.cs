namespace Api.Domain.Models;

public record SubjectDTO(
    int Id,
    int? Period,
    double DurationHours,
    DateOnly? BeganAt,
    int? InstructorId,
    string? InstructorName,
    int CurricularUnitId,
    string CurricularUnit,
    int ClassId,
    string Class,
    short ClassStartingYear
)
{
    public static SubjectDTO Map(Subject obj)
    {
        return new SubjectDTO(
            obj.Id,
            obj.Period,
            obj.DurationHours,
            obj.BeganAt,
            obj.Instructor?.Id,
            obj.Instructor?.Name,
            obj.CurricularUnit.Id,
            obj.CurricularUnit.Name,
            obj.Class.Id, 
            obj.Class.Name,
            obj.Class.StartingYear
        );
    }
}

public record SubjectResultDTO(
    int Id,
    int CurricularUnitId,
    string Name,
    string? Instructor,
    double? Performance
)
{
    public static SubjectResultDTO Map(Subject obj, double? performance = null)
    {
        return new SubjectResultDTO(
            obj.Id,
            obj.CurricularUnit.Id,
            obj.CurricularUnit.Name,
            obj.Instructor?.Name,
            performance
        );
    }
}

public record InstructorSubjectDTO(
    SubjectDTO Subject,
    IEnumerable<ExamResultsDTO> Exams,
    IEnumerable<SubjectFeedbackDTO> Feedbacks
)
{
    public static InstructorSubjectDTO Map(Subject subject, IEnumerable<ExamResultsDTO> exams, IEnumerable<SubjectFeedbackDTO> feedbacks)
    {
        return new InstructorSubjectDTO(
            SubjectDTO.Map(subject),
            exams,
            feedbacks
        );
    }
}
