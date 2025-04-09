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
    public static SubjectEventDetails Map(Subject obj){
        return new SubjectEventDetails(
            obj.Id,
            obj.CurricularUnit.Name,
            obj.DurationHours,
            obj.ClassEvents
                .Select( _classEvent => 
                    new TimeSpan(_classEvent.Event.EndDate.Ticks - _classEvent.Event.StartDate.Ticks).TotalHours
                ).Sum(),
            obj.Instructor?.Id
        );
    }
}

public record CalendarClassPageDTO(
    IEnumerable<SubjectEventDetails> Subjects,
    IEnumerable<ClassEventDTO> Events
){
    public static CalendarClassPageDTO Map(IEnumerable<SubjectEventDetails> subjects, IEnumerable<ClassEventDTO> events){
        return new CalendarClassPageDTO(
            subjects,
            events
        );
    }
}