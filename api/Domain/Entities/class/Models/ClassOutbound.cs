namespace Api.Domain.Models
{
    public class ClassCreateOutbound
    {
        public int CourseId;
        public short StartingYear;
        public short DurationPeriods;
        public bool IsActive;

        public static ClassCreateOutbound Map(Class createdClass)
        => new ClassCreateOutbound
        {
            CourseId = createdClass.Course.Id,
            StartingYear = createdClass.StartingYear,
            DurationPeriods = createdClass.DurationPeriods,
            IsActive = createdClass.IsActive
        };
    }
}