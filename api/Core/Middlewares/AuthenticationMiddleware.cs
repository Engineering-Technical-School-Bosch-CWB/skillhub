
using api.Core.Errors.Pagination;
using Api.Core.JWTService;

namespace api.Core.Middlewares;

public class AuthenticationMiddleware : IMiddleware
{
    private readonly JwtService _jwtService;

    private readonly string[] _pathsToSkip;

    public AuthenticationMiddleware(JwtService jwtService)
    {
        _jwtService = jwtService;
        _pathsToSkip = new []
        {
            "/api/v1/login",
            "/api/v1/users/register",
        };
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        bool mustSkip = _pathsToSkip.Contains(
                    context.Request.Path.Value,
                    StringComparer.OrdinalIgnoreCase);

        if (mustSkip)
        {
            await next.Invoke(context);
            return;
        }

        var auth = context.Request.Headers.Authorization.FirstOrDefault()
                ?? throw new InvalidHeadersException("Missing authorization header.");
        
        var token = auth.Split(" ")[1]
                ?? throw new InvalidHeadersException("Authorization header should be a bearer token.");

        _jwtService.ValidateToken(token);   

        await next.Invoke(context);
    }
}