namespace Api.Domain.Models;

public record ClassEventDTO(
    int Id,
    int? SubjectId,
    int ClassId,
    int EventId
)
{
    public static ClassEventDTO Map(ClassEvent obj)
    {
        return new ClassEventDTO(
            obj.Id,
            obj.Subject?.Id,
            obj.Class.Id,
            obj.Event.Id
        );
    }
}



public record ClassSubjectInfo(
    int Id,
    string Name,
    string? Abbreviation,
    int? SubjectId
){
    public static ClassSubjectInfo Map(ClassEvent obj){
        return new ClassSubjectInfo(
            obj.Class.Id,
            obj.Class.Name,
            obj.Class.Abbreviation,
            obj.Subject?.Id
        );
    }
}

public record SubjectEventDetails(
    int Id,
    string Name,
    double DurationHours,
    double TotalHours,
    int? InstructorId
){
    public static SubjectEventDetails Map(IGrouping<Subject, ClassEvent> obj){
        return new SubjectEventDetails(
            obj.Key.Id,
            obj.Key.CurricularUnit.Name,
            obj.Key.DurationHours,
            obj.Select( _ => new TimeSpan(_.Event.End_date.Ticks - _.Event.Start_date.Ticks).TotalHours).Sum(),
            obj.Key.Instructor?.Id
        );
    }
}