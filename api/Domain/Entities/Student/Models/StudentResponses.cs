namespace Api.Domain.Models;

public record StudentResultDTO(
    SubjectDTO Subject,
    double? Score,
    bool Search
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
    string Subject,
    double? OverallSkillScore,
    double? ClassOverallSkillScore,
    IEnumerable<CompleteSkillResultDTO> SkillResults,
    FeedbackDTO? Feedback
)
{
    public static StudentSubjectResultResponse Map(Student student, string subject, double? classOverallSkillScore, IEnumerable<CompleteSkillResultDTO> skillResults, Feedback? feedback)
    {
        return new StudentSubjectResultResponse(
            student.Id,
            subject,
            student.OverallSkillScore,
            classOverallSkillScore,
            skillResults,
            feedback is null ? null : FeedbackDTO.Map(feedback)
        );
    }
}
