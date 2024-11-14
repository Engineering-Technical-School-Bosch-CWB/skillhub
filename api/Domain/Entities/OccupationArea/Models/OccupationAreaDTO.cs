namespace Api.Domain.Models;
public readonly record struct OccupationAreaDTO(
    string Name,
    bool IsActive
){
    public static OccupationAreaDTO Map( OccupationArea area)
        => new(area.Name, area.IsActive);
};
