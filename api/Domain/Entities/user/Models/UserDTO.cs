namespace Api.Domain.Models
{
    public record UserDTO(
        string Name,
        DateTime Birthday,
        int PositionId,
        int SectorId,
        int OccupationId
    )
    {
        public static UserDTO BuildFromEntity(User user)
        {
            return new UserDTO(
                user.Name,
                user.Birthday,
                user.PositionId,
                user.SectorId,
                user.OccupationId
            );
        }
    }
}
