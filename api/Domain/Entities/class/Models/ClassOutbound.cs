namespace Api.Domain.Models
{
    public class ClassCreateOutbound
    {
        public int CourseId { get; set; }
        public short StartingYear { get; set; }
        public short DurationPeriods { get; set; }
        public bool IsActive { get; set; }

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