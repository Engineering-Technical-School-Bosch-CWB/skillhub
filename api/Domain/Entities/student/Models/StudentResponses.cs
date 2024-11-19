namespace Api.Domain.Models;
public class StudentCreatedResponse
{
    public User? User { get; set; }
    public int ClassId { get; set; }

    public static StudentCreatedResponse Map(Student student)
    => new StudentCreatedResponse {
        User = student.User,
        ClassId = student.Class.Id
    };
}