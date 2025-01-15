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

public record InstructorSubjectDTO(
    SubjectDTO Subject,
    List<ExamDTO> Exams
)