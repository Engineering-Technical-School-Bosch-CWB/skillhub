namespace Api.Domain.Models
{
    public record CourseDTO(
        int Id,
        string? Name,
        string? Abbreviation,
        OccupationAreaDTO? OccupationArea
    ){
        public static CourseDTO Map(Course obj)
            => new(
                obj.Id, 
                obj.Name,
                obj.Abbreviation, 
                obj.DefaultOccupationArea.IsActive ? OccupationAreaDTO.Map(obj.DefaultOccupationArea) : null
            );
    };

}
