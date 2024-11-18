namespace Api.Domain.Models
{
    public readonly record struct UserCreatePayload(
        int SectorId,
        int PositionId,
        int AreaId,
        string Name,
        string EDV
    );

    public readonly record struct UserUpdatePayload(
        string? Name,
        string? EDV,
        string? Birthday,
        bool? NewUser,
        bool? IsActive,
        string? Password,
        int? SectorId,
        int? PositionId,
        int? OccupationId
    );

}