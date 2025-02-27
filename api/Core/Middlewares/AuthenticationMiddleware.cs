using System.Reflection;
using Api.Core.Services;
using Api.Domain.Attributes;

namespace Api.Core.Middlewares;

public class AuthenticationMiddleware : IMiddleware
{
    private readonly JwtService _jwtService;

    public AuthenticationMiddleware(JwtService jwtService)
        => _jwtService = jwtService;

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var endpoint = context.GetEndpoint();
        if ( MustSkipAuthetication(endpoint))
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

    private static bool MustSkipAuthetication(Endpoint? endpoint)
    {
        if (endpoint is null)
            return false;
        
        var attribute = endpoint.Metadata.GetMetadata<IgnoreAuthenticationAttribute>();
        return attribute is not null;
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
