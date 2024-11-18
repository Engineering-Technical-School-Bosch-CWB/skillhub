namespace Api.Domain.Models
{
    public record CourseDTO(
        string? Name,
        string? Abbreviation,
        int? OccupationAreaId,
        OccupationAreaDTO? OccupationArea
    ){
        public static CourseDTO Map(Course course)
            => new(course.Name, course.Abbreviation, course.DefaultOccupationArea.Id, OccupationAreaDTO.Map(course.DefaultOccupationArea));
    };

}