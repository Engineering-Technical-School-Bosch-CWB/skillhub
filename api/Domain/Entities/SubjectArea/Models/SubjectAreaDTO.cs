namespace Api.Domain.Models;

public record SubjectAreaDTO(
    int Id,
    string Name,
    double? Grade,
    double? Aptitude
)
{
    public static SubjectAreaDTO Map(SubjectArea obj, (double?, double?)? performance = null)
    {
        return new SubjectAreaDTO(
            obj.Id,
            obj.Name,
            performance?.Item1,
            performance?.Item2
        );
    }
}