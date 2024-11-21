namespace Api.Domain.Models
{
    public record UserDTO(
        int Id,
        string Name,
        DateTime Birthday,
        int PositionId,
        int SectorId,
        int OccupationAreaId,
        int PermissionLevel
    )
    {
        public static UserDTO Map(User user)
        {
            var permission = user.Position.Name switch 
            {
                "student" => 1,
                "instructor" => 2,
                _ => 0
            };

            return new UserDTO(
                user.Id,
                user.Name,
                user.Birthday,
                user.Position.Id,
                user.Sector.Id,
                user.Area.Id,
                permission
            );
        }
    }
}