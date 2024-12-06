namespace Api.Domain.Models;

public record StudentResultDTO(
    SubjectDTO Subject,
    double? Score
)
{ }

public record StudentResultResponse(
    int StudentId,
    double? OverallSkillScore,
    IEnumerable<StudentResultDTO> UserResults
)
{
    public static StudentResultResponse Map(StudentDTO student, IEnumerable<StudentResultDTO> userResults)
    {
        return new StudentResultResponse(
            student.Id,
            student.OverallSkillScore,
            userResults
        );
    }
}

public record StudentSubjectResultResponse(
    int StudentId,
    double? OverallSkillScore,
    double? ClassOverallSkillScore,
    IEnumerable<SkillResultDTO> SkillResults,
    FeedbackDTO? Feedback
)
{
    public static StudentSubjectResultResponse Map(Student student, double? classOverallSkillScore, IEnumerable<SkillResultDTO> skillResults, Feedback? feedback)
    {
        return new StudentSubjectResultResponse(
            student.Id,
            student.OverallSkillScore,
            classOverallSkillScore,
            skillResults,
            feedback is null ? null : FeedbackDTO.Map(feedback)
        );
    }
}