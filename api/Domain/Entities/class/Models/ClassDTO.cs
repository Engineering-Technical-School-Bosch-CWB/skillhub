namespace Api.Domain.Models;

public record ClassDTO(
    string Name,
    int Id,
    short StartingYear,
    short DurationPeriods,
    int CourseId,
    bool IsActive
)
{
    public static ClassDTO Map(Class obj)
    {
        return new ClassDTO(
            obj.Name,
            obj.Id,
            obj.StartingYear,
            obj.DurationPeriods,
            obj.Course.Id,
            obj.IsActive
        );
    }
}