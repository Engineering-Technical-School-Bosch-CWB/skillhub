using Api.Domain.Models;

public record SubjectDTO(
    int Id,
    int Period,
    float DurationHours,
    DateOnly BeganAt,
    int InstructorId,
    int CurricularUnitId,
    int ClassId
)
{
    public static SubjectDTO Map(Subject obj)
    {
        return new SubjectDTO(
            obj.Id,
            obj.Period,
            obj.DurationHours,
            obj.BeganAt,
            obj.Instructor.Id,
            obj.CurricularUnit.Id,
            obj.Class.Id
        );
    }
}