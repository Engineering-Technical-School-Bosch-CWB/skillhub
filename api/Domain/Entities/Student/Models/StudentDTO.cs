namespace Api.Domain.Models;

public record StudentDTO(
    int Id,
    double? OverallScore,
    double? OverallSkillScore,
    int ClassId
)
{
    public static StudentDTO Map(Student obj)
    {
        return new StudentDTO(
            obj.Id,
            obj.OverallScore,
            obj.OverallSkillScore,
            obj.Class.Id
        );
    }
}

public record StudentExamResultsDTO(
    int Id,
    string Name,
    double? Mean,
    IEnumerable<SimpleSkillResultDTO> SkillResults
)
{
    public static StudentExamResultsDTO Map(Student obj, double? mean, IEnumerable<SimpleSkillResultDTO> skillResults)
    {
        return new StudentExamResultsDTO(
            obj.Id,
            obj.User.Name,
            mean,
            skillResults
        );
    }
}

public record SimpleStudentDTO(
    int Id,
    string Name,
    string Identification,
    double? Performance,
    DateOnly? Birthday
)
{
    public static SimpleStudentDTO Map(Student obj, double? performance = null)
    {
        return new SimpleStudentDTO(
            obj.Id,
            obj.User.Name,
            obj.User.Identification,
            performance,
            obj.User.Birthday
        );
    }
}

public record InstructorStudentDTO(
    int Id,
    int UserId,
    string Name,
    string Identification,
    DateOnly? Birthday,
    string ClassName,
    int? ClassPosition,
    double? Performance,
    string Position,
    string Sector,
    IEnumerable<SubjectResultDTO> SubjectResults,
    IEnumerable<CompleteFeedbackDTO> SubjectFeedBacks,
    IEnumerable<CompleteFeedbackDTO> Feedbacks
)
{
    public static InstructorStudentDTO Map(Student obj, IEnumerable<SubjectResultDTO> subjectResults, IEnumerable<CompleteFeedbackDTO> feedbacks, int? position = null)
    {
        return new InstructorStudentDTO(
            obj.Id,
            obj.User.Id,
            obj.User.Name,
            obj.User.Identification,
            obj.User.Birthday,
            obj.Class.Name + " - " + obj.Class.StartingYear,
            position,
            obj.OverallScore,
            obj.User.Position.Name,
            obj.User.Sector.Name,
            subjectResults,
            feedbacks.Where(f => f.Subject is not null),
            feedbacks.Where(f => f.Subject is null)
        );
    }
}