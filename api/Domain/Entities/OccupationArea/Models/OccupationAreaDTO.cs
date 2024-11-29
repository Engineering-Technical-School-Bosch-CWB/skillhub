namespace Api.Domain.Models;
public readonly record struct OccupationAreaDTO(
    int Id,
    string? Name
){
    public static OccupationAreaDTO Map( OccupationArea obj)
    {
        return new OccupationAreaDTO(
            obj.Id,
            obj.Name
        );
    }
};
