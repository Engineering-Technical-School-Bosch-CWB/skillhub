namespace Api.Domain.Models
{
    public class SubjectCreateOutbound
    {
        public User? Instructor { get; set; }
        public CurricularUnit? CurricularUnit { get; set; }
        public Class? Class { get; set; }
        public int Period { get; set; }
        public float DurationHours { get; set; }
        public DateTime BeganAt { get; set; }
        public bool IsActive { get; set; } = true;

        public static SubjectCreateOutbound Map(Subject subject)
        => new SubjectCreateOutbound {
            Instructor = subject.Instructor,
            CurricularUnit = subject.CurricularUnit,
            Class = subject.Class,
            Period = subject.Period,
            DurationHours = subject.DurationHours,
            BeganAt = subject.BeganAt,
            IsActive = subject.IsActive
        };
    }
}