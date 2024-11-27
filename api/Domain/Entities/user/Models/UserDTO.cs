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
    public static UserDTO Map(User user, StudentDTO? student)
    {
        return new UserDTO(
            user.Id,
            user.Name,
            user.Birthday,
            user.Position.Id,
            user.Sector.Id,
            user.OccupationArea.Id,
            user.Position.PositionLevel,
            student
        );
    }
}