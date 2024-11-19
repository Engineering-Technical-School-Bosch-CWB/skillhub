using Api.Domain.Services.Pagination;

namespace Api.Domain.Models;

public class CourseResponse
{
    public required string Message { get; set; }
    public required CourseDTO Data { get; set; }

    public static CourseResponse Map(Course course, string text)
    {
        return new CourseResponse()
        {
            Message = text,
            Data = CourseDTO.Map(course)
        };
    }
};

public class CoursePaginationResponse
{
    public required IEnumerable<CourseDTO> Courses { get; set; }
    public required PaginationInfo PaginationInfo { get; set; }
    public required string Message { get; set; }
    public static CoursePaginationResponse Map((IEnumerable<Course>, PaginationInfo) tuple, string text)
    {
        return new CoursePaginationResponse
        {
            Courses = tuple.Item1.Select(CourseDTO.Map),
            PaginationInfo = tuple.Item2,
            Message = text
        };
    }
}