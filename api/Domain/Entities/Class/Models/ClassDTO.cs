namespace Api.Domain.Models;

public record ClassDTO(
    int Id,
    string Name,
    short StartingYear,
    short? DurationPeriods,
    int CourseId,
    bool IsActive
)
{
    public static ClassDTO Map(Class obj)
    {
        return new ClassDTO(
            obj.Id,
            obj.Name,
            obj.StartingYear,
            obj.DurationPeriods,
            obj.Course.Id,
            obj.IsActive
        );
    }
}

public record ClassGraphsDTO(
    double? OverallPerformance,
    IEnumerable<SubjectResultDTO> SubjectResults,
    IEnumerable<SimpleStudentDTO> StudentResults,
    IEnumerable<SubjectAreaDTO> SubjectAreaResults
) { }

public record ClassPageDTO(
    ClassDTO Class,
    IEnumerable<SubjectResultDTO> Subjects,
    ClassGraphsDTO Graphs
)
{
    public static ClassPageDTO Map(Class obj, IEnumerable<SubjectResultDTO> subjects, ClassGraphsDTO graphs)
    {
        return new ClassPageDTO(
            ClassDTO.Map(obj),
            subjects,
            graphs
        );
    }
}
