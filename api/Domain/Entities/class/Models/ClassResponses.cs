namespace Api.Domain.Models;
public class ClassCreatedResponse
{
    public int CourseId { get; set; }
    public short StartingYear { get; set; }
    public short DurationPeriods { get; set; }
    public bool IsActive { get; set; }

    public static ClassCreatedResponse Map(Class createdClass)
    => new ClassCreatedResponse
    {
        CourseId = createdClass.Course.Id,
        StartingYear = createdClass.StartingYear,
        DurationPeriods = createdClass.DurationPeriods,
        IsActive = createdClass.IsActive
    };
}