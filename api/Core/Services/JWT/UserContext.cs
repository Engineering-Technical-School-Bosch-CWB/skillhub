using Api.Domain.Services;

namespace Api.Core.Services;
public readonly record struct ContextData
{
    public required Guid UserId { get; init; }
    public required string Name { get; init; }
    public required int PermissionLevel { get; init; }
}

public class UserContext
{
    private ContextData _data;

    public Guid UserId => _data.UserId;
    public string UserName => _data.Name;
    public int PermissionLevel => _data.PermissionLevel;

    public void Fill(ContextData data)
    {
        _data = data;
    }
}