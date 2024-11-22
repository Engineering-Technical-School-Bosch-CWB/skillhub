namespace Api.Domain.Models
{
    public record CourseDTO(
        int Id,
        string? Name,
        string? Abbreviation,
        OccupationAreaDTO? OccupationArea
    ){
        public static CourseDTO Map(Course course)
            => new(course.Id, course.Name, course.Abbreviation, OccupationAreaDTO.Map(course.DefaultOccupationArea));
    };

}