namespace Api.Domain.Models;

public record SubjectAreaDTO(
    int Id,
    string Name,
    double? Performance
)
{
    public static SubjectAreaDTO Map(SubjectArea obj, double? performance = null)
    {
        return new SubjectAreaDTO(
            obj.Id,
            obj.Name,
            performance
        );
    }
}