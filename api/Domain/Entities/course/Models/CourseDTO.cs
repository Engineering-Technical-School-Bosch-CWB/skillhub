namespace Api.Domain.Models
{
    public record CourseDTO(
        string? Name,
        string? Abbreviation,
        OccupationAreaDTO? OccupationArea
    ){
        public static CourseDTO Map(Course course)
            => new(course.Name, course.Abbreviation, OccupationAreaDTO.Map(course.DefaultOccupationArea));
    };

}