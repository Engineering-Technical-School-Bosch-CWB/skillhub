using Api.Domain.Services;

namespace Api.Domain.Models;
public class CourseCreatedResponse
{
    public int CourseId { get; set; }
    public required string Name { get; set; }
    public string? Abbreviation { get; set; }
    public required string OccupationArea { get; set; }

    public static CourseCreatedResponse Map(Course course, OccupationArea area)
    {
        return new CourseCreatedResponse()
        {
            CourseId = course.Id,
            OccupationArea = area.Name,
            Name = course.Name,
            Abbreviation = course.Abbreviation
        };
    }
};

public class CourseUpdatedResponse
{
    public string? Name { get; set; }
    public string? Abbreviation { get; set; }
    public int? OccupationAreaId { get; set; }

    public static CourseUpdatedResponse Map(Course course){
        return new CourseUpdatedResponse()
        {
            Name = course.Name,
            Abbreviation = course.Abbreviation,
            OccupationAreaId = course.DefaultOccupationArea.Id,
        };
    }
}

public class AllCoursesResponse
{
    public required IEnumerable<CourseDTO> Courses { get; set; }
    public required PaginationInfo PaginationInfo { get; set; }
    public required string Message { get; set; }
    public static AllCoursesResponse Map((IEnumerable<Course>, PaginationInfo) tuple, string text)
    {
        return new AllCoursesResponse
        {
            Courses = tuple.Item1.Select(CourseDTO.Map),
            PaginationInfo = tuple.Item2,
            Message = text
        };
    }
}

public class OneCourseResponse
{
    public required CourseDTO Course { get; set; }

    public required string Message { get; set; }
    public static OneCourseResponse Map(Course course, string text)
    {
        return new OneCourseResponse
        {
            Course = CourseDTO.Map(course),
            Message = text
        };
    }
}

public class CourseDeletedResponse
{
    public required string Message { get; set; }
}