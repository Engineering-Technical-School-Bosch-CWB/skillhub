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
            obj.Classe.Id,
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
            obj.Classe.Id,
            obj.Classe.Name,
            obj.Classe.Abbreviation,
            obj.Subject?.Id
        );
    }
}
