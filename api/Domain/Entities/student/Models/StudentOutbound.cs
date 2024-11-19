namespace Api.Domain.Models
{
    public class StudentCreateOutbound
    {
        public User? User { get; set; }
        public int ClassId { get; set; }

        public static StudentCreateOutbound Map(Student student)
        => new StudentCreateOutbound {
            User = student.User,
            ClassId = student.Class.Id
        };
    }
}