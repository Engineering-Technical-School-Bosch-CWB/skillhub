namespace Api.Domain.Models;

public record SubjectDTO(
    int Id,
    int? Period,
    double DurationHours,
    DateOnly? BeganAt,
    int? InstructorId,
    int CurricularUnitId,
    string CurricularUnit,
    int ClassId,
    string Class
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
            obj.CurricularUnit.Id,
            obj.CurricularUnit.Name,
            obj.Class.Id, 
            obj.Class.Name
        );
    }
}

public record SimpleSubjectDTO(
    int Id,
    string Name,
    string? Instructor
)
{
    public static SimpleSubjectDTO Map(Subject obj)
    {
        return new SimpleSubjectDTO(
            obj.Id,
            obj.CurricularUnit.Name,
            obj.Instructor?.Name
        );
    }
}

public record InstructorSubjectDTO(
    SubjectDTO Subject,
    IEnumerable<ExamResultsDTO> Exams
)
{
    public static InstructorSubjectDTO Map(Subject subject, IEnumerable<ExamResultsDTO> exams)
    {
        return new InstructorSubjectDTO(
            SubjectDTO.Map(subject),
            exams
        );
    }
}