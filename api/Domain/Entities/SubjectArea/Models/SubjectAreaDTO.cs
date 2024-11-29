using Api.Domain.Models;

public record SubjectAreaDTO(
    int Id,
    string Name
)
{
    public static SubjectAreaDTO Map(SubjectArea obj)
    {
        return new SubjectAreaDTO(
            obj.Id,
            obj.Name
        );
    }
}