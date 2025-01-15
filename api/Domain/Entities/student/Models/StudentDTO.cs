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

public record StudentResultDTO(
    int Id,
    string Name,
    double Mean,
    IEnumerable<CompleteSkillResultDTO> SkillResults
)
{
    public static StudentResultDTO Map(Student obj, double mean, IEnumerable<CompleteSkillResultDTO> skillResults)
    {
        return new StudentResultDTO(
            obj.Id,
            obj.User.Name,
            mean,
            skillResults
        );
    }
}