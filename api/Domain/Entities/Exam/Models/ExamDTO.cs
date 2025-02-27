namespace Api.Domain.Models;


public record ExamDTO(
    int Id,
    string Name,
    string? Description,
    DateOnly? AppliedAt,
    int? InstructorId,
    IEnumerable<SkillResultDTO> Skills
)
{
    public static ExamDTO Map(Exam obj, IEnumerable<SkillResultDTO> skills)
    {
        return new ExamDTO(
            obj.Id,
            obj.Name,
            obj.Description,
            obj.AppliedAt,
            obj.Instructor?.Id,
            skills
        );
    }
}

public record SimpleExamDTO(
    int Id,
    string Name,
    string? Description,
    DateOnly? AppliedAt
)
{
    public static SimpleExamDTO Map(Exam obj)
    {
        return new SimpleExamDTO(
            obj.Id,
            obj.Name,
            obj.Description,
            obj.AppliedAt
        );
    }
}

public record ExamResultsDTO(
    int Id,
    string Name,
    string? Description,
    DateOnly? AppliedAt,
    IEnumerable<ExamSkillDTO> Skills,
    IEnumerable<StudentExamResultsDTO> Students
)
{
    public static ExamResultsDTO Map(Exam obj, IEnumerable<ExamSkillDTO> skills, IEnumerable<StudentExamResultsDTO> students)
    {
        return new ExamResultsDTO(
            obj.Id,
            obj.Name,
            obj.Description,
            obj.AppliedAt,
            skills,
            students
        );
    }
}

public record EditExamDTO(
    ExamDTO Exam,
    ExamSkillsDTO Info
)
{
    public static EditExamDTO Map(Exam obj, ExamSkillsDTO dto)
    {
        return new EditExamDTO(
            ExamDTO.Map(obj, []),
            dto
        );
    }
}

public record EvaluateExamDTO(
    SubjectDTO Subject,
    SimpleExamDTO Exam,
    IEnumerable<ExamEvaluationResultDTO> Students
)
{
    public static EvaluateExamDTO Map(Subject subject, Exam exam, IEnumerable<ExamEvaluationResultDTO> students)
    {
        return new EvaluateExamDTO(
            SubjectDTO.Map(subject),
            SimpleExamDTO.Map(exam),
            students
        );
    }
}
