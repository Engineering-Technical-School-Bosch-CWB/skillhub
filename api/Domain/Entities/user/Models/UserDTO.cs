namespace Api.Domain.Models;
public record UserDTO(
    int Id,
    string Name,
    DateOnly? Birthday,
    int PositionId,
    int SectorId,
    int OccupationAreaId,
    short PermissionLevel,
    StudentDTO? StudentProfile
)
{
    public static UserDTO Map(User obj, StudentDTO? student)
    {
        return new UserDTO(
            obj.Id,
            obj.Name,
            obj.Birthday,
            obj.Position.Id,
            obj.Sector.Id,
            obj.OccupationArea.Id,
            obj.Position.PositionLevel,
            student
        );
    }
}