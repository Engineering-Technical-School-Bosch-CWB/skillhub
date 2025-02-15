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
    int UserId,
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
            obj.User.Id,
            obj.User.Name,
            obj.User.Identification,
            performance,
            obj.User.Birthday
        );
    }
}

public record StudentProfileDTO(
    int Id,
    double? Performance,
    int ClassId,
    string ClassName,
    int? ClassPosition,
    IEnumerable<SubjectAreaDTO> SubjectAreaResults,
    IEnumerable<SubjectResultDTO> SubjectResults,
    IEnumerable<CompleteFeedbackDTO> SubjectFeedBacks,
    IEnumerable<CompleteFeedbackDTO> Feedbacks
)
{
    public static StudentProfileDTO Map(Student obj, IEnumerable<SubjectAreaDTO> subjectAreaResults, IEnumerable<SubjectResultDTO> subjectResults, IEnumerable<CompleteFeedbackDTO> feedbacks, bool show, int? position = null)
    {
        return new StudentProfileDTO(
            obj.Id,
            obj.OverallScore,
            obj.Class.Id,
            obj.Class.Name + " - " + obj.Class.StartingYear,
            show ? position : null,
            show ? subjectAreaResults : [],
            show ? subjectResults : [],
            feedbacks.Where(f => f.Subject is not null),
            feedbacks.Where(f => f.Subject is null && (show || f.StudentMayVisualize))
        );
    }
}