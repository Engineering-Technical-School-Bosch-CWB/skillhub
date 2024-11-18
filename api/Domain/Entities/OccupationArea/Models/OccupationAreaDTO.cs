namespace Api.Domain.Models;
public readonly record struct OccupationAreaDTO(
    int Id,
    string? Name
){
    public static OccupationAreaDTO Map( OccupationArea area)
        => new(area.Id, area.Name);
};
