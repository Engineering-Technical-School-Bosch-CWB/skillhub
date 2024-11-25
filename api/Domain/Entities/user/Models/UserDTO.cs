namespace Api.Domain.Models
{
    public record UserDTO(
        int Id,
        string Name,
        DateOnly? Birthday,
        int? PositionId,
        int? SectorId,
        int? OccupationAreaId,
        int PermissionLevel
    )
    {
        public static UserDTO Map(User user)
        {
            var permission = 0;

            if(user.Position != null)
            {
                permission = user.Position.Name switch 
                {
                    "Instructor" => 2,
                    "Apprentice" => 1,
                    _ => 0
                };
            }

            return new UserDTO(
                user.Id,
                user.Name,
                user.Birthday,
                user.Position?.Id,
                user.Sector?.Id,
                user.OccupationArea?.Id,
                permission
            );
        }
    }
}