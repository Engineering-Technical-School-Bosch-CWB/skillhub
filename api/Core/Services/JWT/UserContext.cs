using Api.Domain.Enums;

namespace Api.Core.Services;
public readonly record struct ContextData
{
    public required int UserId { get; init; }
    public required string Name { get; init; }
    public required EPermissionLevel PermissionLevel { get; init; }
    public required string Sector { get; init; }
}

public class UserContext
{
    private ContextData _data;

    public int UserId => _data.UserId;
    public string UserName => _data.Name;
    public EPermissionLevel PermissionLevel => _data.PermissionLevel;
    public string Sector => _data.Sector;

    public void Fill(ContextData data)
    {
        _data = data;
    }
}