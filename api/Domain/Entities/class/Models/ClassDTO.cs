using Api.Domain.Models;

public record ClassDTO(
    int Id,
    short StartingYear,
    short DurationPeriods,
    int CourseId
)
{
    public static ClassDTO Map(Class obj)
    {
        return new ClassDTO(
            obj.Id,
            obj.StartingYear,
            obj.DurationPeriods,
            obj.Course.Id
        );
    }
}