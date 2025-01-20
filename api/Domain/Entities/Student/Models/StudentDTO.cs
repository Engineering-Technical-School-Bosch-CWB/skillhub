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
    IEnumerable<CompleteSkillResultDTO> SkillResults
)
{
    public static StudentExamResultsDTO Map(Student obj, double? mean, IEnumerable<CompleteSkillResultDTO> skillResults)
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
    double? Performance
)
{
    public static SimpleStudentDTO Map(Student obj, double? performance = null)
    {
        return new SimpleStudentDTO(
            obj.Id,
            obj.User.Name,
            performance
        );
    }
}
