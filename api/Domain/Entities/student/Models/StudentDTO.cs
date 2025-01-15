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

public record StudentResultsDTO(
    int Id,
    string Name,
    double? Mean,
    IEnumerable<CompleteSkillResultDTO> SkillResults
)
{
    public static StudentResultsDTO Map(Student obj, double? mean, IEnumerable<CompleteSkillResultDTO> skillResults)
    {
        return new StudentResultsDTO(
            obj.Id,
            obj.User.Name,
            mean,
            skillResults
        );
    }
}

public record SimpleStudentDTO(
    int Id,
    string Name
)
{
    public static SimpleStudentDTO Map(Student obj)
    {
        return new SimpleStudentDTO(
            obj.Id,
            obj.User.Name
        );
    }
}