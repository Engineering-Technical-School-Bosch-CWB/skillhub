using api.Domain.Services.Pagination;

namespace Api.Domain.Models;

public class CourseResponse
{
    public required CourseDTO Course { get; set; }
    public required string Message { get; set; }

    public static CourseResponse Map(Course course, string text)
    {
        return new CourseResponse()
        {
            Course = CourseDTO.Map(course),
            Message = text
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

    // public class CourseCreatedResponse
    // {
    //     public int CourseId { get; set; }
    //     public required string Name { get; set; }
    //     public string? Abbreviation { get; set; }
    //     public required string OccupationAreaId { get; set; }

    //     public static CourseCreatedResponse Map(Course course, OccupationArea area)
    //     {
    //         return new CourseCreatedResponse()
    //         {
    //             CourseId = course.Id,
    //             OccupationArea = area.Name,
    //             Name = course.Name,
    //             Abbreviation = course.Abbreviation
    //         };
    //     }
    // };


    // public class CourseUpdatedOutbound
    // {
    //     public string? Name { get; set; }
    //     public string? Abbreviation { get; set; }
    //     public int? OccupationAreaId { get; set; }

    //     public static CourseUpdatedOutbound Map(Course course){
    //         return new CourseUpdatedOutbound()
    //         {
    //             Name = course.Name,
    //             Abbreviation = course.Abbreviation,
    //             OccupationAreaId = course.DefaultOccupationArea.Id,
    //         };
    //     }
    // }



