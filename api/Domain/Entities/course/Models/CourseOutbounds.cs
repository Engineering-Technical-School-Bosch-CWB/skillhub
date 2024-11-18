using Api.Domain.Services;

namespace Api.Domain.Models
{
    public class CourseCreatedOutbound
    {
        public int CourseId { get; set; }
        public required string Name { get; set; }
        public string? Abbreviation { get; set; }
        public required string OccupationArea { get; set; }

        public static CourseCreatedOutbound Map(Course course, OccupationArea area)
        {
            return new CourseCreatedOutbound()
            {
                CourseId = course.Id,
                OccupationArea = area.Name,
                Name = course.Name,
                Abbreviation = course.Abbreviation
            };
        }
    };

    public class CourseUpdatedOutbound
    {
        public string? Name { get; set; }
        public string? Abbreviation { get; set; }
        public int? OccupationAreaId { get; set; }

        public static CourseUpdatedOutbound Map(Course course){
            return new CourseUpdatedOutbound()
            {
                Name = course.Name,
                Abbreviation = course.Abbreviation,
                OccupationAreaId = course.DefaultOccupationArea.Id,
            };
        }
    }

    public class AllCoursesOutbound
    {
        public required IEnumerable<CourseDTO> Courses { get; set; }
        public required PaginationInfo PaginationInfo { get; set; }
        public required string Message { get; set; }
        public static AllCoursesOutbound Map((IEnumerable<Course>, PaginationInfo) tuple, string text)
        {
            return new AllCoursesOutbound
            {
                Courses = tuple.Item1.Select(CourseDTO.Map),
                PaginationInfo = tuple.Item2,
                Message = text
            };
        }
    }

    public class OneCourseOutbound
    {
        public required CourseDTO Course { get; set; }

        public required string Message { get; set; }
        public static OneCourseOutbound Map(Course course, string text)
        {
            return new OneCourseOutbound
            {
                Course = CourseDTO.Map(course),
                Message = text
            };
        }
    }

    public class CourseDeletedOutbound
    {
        public required string Message { get; set; }
    }
}