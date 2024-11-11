namespace Api.Domain.Models
{
    public readonly record struct UserCreatePayload(
        int SectorId,
        int PositionId,
        string Name,
        string EDV
    );

    public readonly record struct UserUpdatePayload(
        
    );
}