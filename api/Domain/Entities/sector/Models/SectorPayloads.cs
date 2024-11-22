namespace Api.Domain.Models;

public readonly record struct SectorCreatePayload(
    string Name
);

public readonly record struct SectorUpdatePayload(
    string? Name
);