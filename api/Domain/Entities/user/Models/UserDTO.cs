namespace Api.Domain.Models
{
    public record UserDTO(
        int Id,
        string Name,
        DateTime Birthday,
        int? PositionId,
        int? SectorId,
        int? OccupationAreaId,
        int PermissionLevel,
        int? StudentProfileId
    )
    {
        public static UserDTO Map(User user)
        {
            var permission = 0;

            if(user.Position != null)
            {
                permission = user.Position.Name switch 
                {
                    "student" => 1,
                    "instructor" => 2,
                    _ => 0
                };
            }

            return new UserDTO(
                user.Id,
                user.Name,
                user.Birthday,
                user.Position?.Id,
                user.Sector?.Id,
                user.Area?.Id,
                permission,
                user.StudentProfile?.Id
            );
        }
    }
}