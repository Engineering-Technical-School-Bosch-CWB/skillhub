using Api.Core.Services;

namespace Api.Core.Middlewares;

public class AuthenticationMiddleware : IMiddleware
{
    private readonly JwtService _jwtService;

    private readonly string[] _pathsToSkip;

    public AuthenticationMiddleware(JwtService jwtService)
    {
        _jwtService = jwtService;
        _pathsToSkip =
        [
            "/api/v1/login",
            "/api/v1/users",
        ];
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

        var auth = context.Request.Headers.Authorization.FirstOrDefault();
        if(!TryGetBearerToken(auth!, out var token))
        {
            await RespondWithErrorAsync(context, 400, "Invalid authorization headers!");
            return;
        }

        try 
        {
            _jwtService.ValidateToken(token!);   
        }
        catch(Exception)
        {
            await RespondWithErrorAsync(context, 401, "Invalid JWT token!");
            return;
        }

        await next.Invoke(context);
    }

    private bool TryGetBearerToken(string auth, out string? token)
    {
        if (auth is not null)
        {
            var parts = auth.Split(" ");
            if (parts.Length == 2 && parts[0] == "Bearer")
            {
                token = parts[1];
                return true;
            }
        }

        token = null;
        return false;
    }

    private async Task RespondWithErrorAsync(HttpContext context, int statusCode, string message)
    {
        var error = new Error(statusCode, message);
        context.Response.StatusCode = error.Status;
        await context.Response.WriteAsJsonAsync(error);
    }
}