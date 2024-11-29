using Api.Domain.Models;

public record SubjectDTO(
    int Id,
    int Period,
    double DurationHours,
    DateOnly BeganAt,
    int InstructorId,
    int CurricularUnitId,
    int ClassId,
    string Name
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
            obj.Class.Id, 
            obj.CurricularUnit.Name + " - " + obj.Class.Name
        );
    }
}