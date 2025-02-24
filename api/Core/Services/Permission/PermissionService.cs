namespace Api.Core.Services;

using Api.Core.Errors;
using Api.Domain.Enums;
using Api.Domain.Services;

public class PermissionService(UserContext userContext) : IPermissionService
{
    private readonly UserContext _context = userContext;
    private static readonly HashSet<string> ets = ["ETS", "ENGINEERING TECH SCHOOL"];

    public void ValidateAdmPermission()
    {
        if (!(_context.PermissionLevel == EPermissionLevel.Admin && ets.Contains(_context.Sector.ToUpperInvariant())))
            throw new ForbiddenAccessException("User don't have permission to this service!");
    }

    public bool IsLogged(int id)
        => _context.UserId == id;
}
