namespace Api.Domain.Models;

public record ClassDTO(
    string Name,
    int Id,
    short StartingYear,
    short? DurationPeriods,
    int CourseId,
    bool IsActive
)
{
    public static ClassDTO Map(Class obj)
    {
        return new ClassDTO(
            obj.Name,
            obj.Id,
            obj.StartingYear,
            obj.DurationPeriods,
            obj.Course.Id,
            obj.IsActive
        );
    }
}

public record ClassGraphsDTO(
    double GeneralPerformance,
    IEnumerable<(SimpleSubjectDTO, double)> SubjectResults,
    IEnumerable<(SimpleStudentDTO, double)> StudentResults,
    IEnumerable<(SubjectAreaDTO, double)> SubjectAreaResults
) {}

public record ClassPageDTO(
    ClassDTO Class,
    IEnumerable<SimpleSubjectDTO> Subjects,
    IEnumerable<SimpleStudentDTO> Students,
    ClassGraphsDTO Graphs
)
{
    public static ClassPageDTO Map(Class obj, IEnumerable<SimpleSubjectDTO> subjects, IEnumerable<SimpleStudentDTO> students, ClassGraphsDTO graphs)
    {
        return new ClassPageDTO(
            ClassDTO.Map(obj),
            subjects,
            students,
            graphs
        );
    }
}