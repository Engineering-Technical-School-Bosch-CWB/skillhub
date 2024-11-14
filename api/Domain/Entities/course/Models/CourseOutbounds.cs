namespace Api.Domain.Models
{
    public class CourseCreatedOutbound
    {
        public int CourseId { get; set; }
        public string? OccupationArea { get; set; }

        public static CourseCreatedOutbound Map(Course course, OccupationArea area)
        {
            return new CourseCreatedOutbound()
            {
                CourseId = course.Id,
                OccupationArea = area.Name
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
}