using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Attributes;
using Api.Domain.Services;

namespace Api.Core.Middlewares;

public class AuthenticationMiddleware (JwtService jwtService, IPermissionService permissionService) : IMiddleware
{
    private readonly JwtService _jwtService = jwtService;
    private readonly IPermissionService _permissionService = permissionService;

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

        // if(!EndpointCanBeAccessed(endpoint))
        //     throw new ForbiddenAccessException("User don't have permission to this service!");

        await next.Invoke(context);
    }

    private static bool MustSkipAuthetication(Endpoint? endpoint)
    {
        if (endpoint is null)
            return false;
        
        var attribute = endpoint.Metadata.GetMetadata<IgnoreAuthenticationAttribute>();
        return attribute is not null;
    }

    private bool EndpointCanBeAccessed(Endpoint? endpoint)
    {
        if (endpoint is null)
            return false;

        var attribute = endpoint.Metadata.GetMetadata<StudentCanBeAccessAttribute>();
        if(attribute is null)
            _permissionService.ValidateAdmPermission();

        return true;
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
