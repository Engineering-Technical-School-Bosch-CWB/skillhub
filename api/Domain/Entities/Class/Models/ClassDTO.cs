namespace Api.Domain.Models;

public record ClassDTO(
    int Id,
    string Name,
    string? Abbreviation,
    short StartingYear,
    short? DurationPeriods,
    int CourseId,
    bool IsActive,
    bool IsArchived
)
{
    public static ClassDTO Map(Class obj)
    {
        return new ClassDTO(
            obj.Id,
            obj.Name,
            obj.Abbreviation,
            obj.StartingYear,
            obj.DurationPeriods,
            obj.Course.Id,
            obj.IsActive,
            obj.IsArchived
        );
    }
}

public record SimpleClassDTO(
    int Id,
    string Name,
    string? Abbreviation,
    short StartingYear,
    short? DurationPeriods,
    bool IsArchived
)
{
    public static SimpleClassDTO Map(Class obj)
    {
        return new SimpleClassDTO(
            obj.Id,
            obj.Name,
            obj.Abbreviation,
            obj.StartingYear,
            obj.DurationPeriods,
            obj.IsArchived
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
    IEnumerable<SimpleStudentDTO> Students,
    ClassGraphsDTO Graphs
)
{
    public static ClassPageDTO Map(Class obj, IEnumerable<SubjectResultDTO> subjects, IEnumerable<SimpleStudentDTO> students, ClassGraphsDTO graphs)
    {
        return new ClassPageDTO(
            ClassDTO.Map(obj),
            subjects,
            students,
            graphs
        );
    }
}
