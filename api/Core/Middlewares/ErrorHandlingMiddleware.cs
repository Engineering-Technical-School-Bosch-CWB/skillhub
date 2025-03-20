using Api.Core.Errors;
using Api.Core.Errors.Authentication;
using Api.Core.Errors.JWTService;
using Api.Core.Errors.Login;
using Microsoft.AspNetCore.Diagnostics;
using InvalidDataException = Api.Core.Errors.InvalidDataException;

namespace Api.Core.Middlewares;

public record Error(int Status, string Message, Object? Details = null);

public class ErrorHandlingMiddleware : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var error = exception switch
        {
            AlreadyExistsException  e => new Error(StatusCodes.Status400BadRequest, e.Message),
            DeleteFailException e => new Error(StatusCodes.Status500InternalServerError, e.Message),
            InvalidDataException e => new Error(StatusCodes.Status400BadRequest, e.Message),
            NotFoundException e => new Error(StatusCodes.Status404NotFound, e.Message),
            UpsertFailException e => new Error(StatusCodes.Status500InternalServerError, e.Message),

            // ..authorization 
            ForbiddenAccessException e => new Error(StatusCodes.Status403Forbidden, e.Message),
            InvalidTokenException e => new Error(StatusCodes.Status400BadRequest, e.Message),
            InvalidHeadersException e => new Error(StatusCodes.Status401Unauthorized, e.Message),

            // ..login
            UserNotRegisteredException e => new Error(StatusCodes.Status403Forbidden, e.Message),
            NoSuchPositionException e => new Error(StatusCodes.Status404NotFound, e.Message),
            WrongPasswordException e => new Error(StatusCodes.Status401Unauthorized, e.Message),

            // ..server
            ServiceConfigurationException e => new Error(StatusCodes.Status500InternalServerError, e.Message),
            UnknownServerError e => new Error(StatusCodes.Status500InternalServerError, e.Message),

            _ => new Error(StatusCodes.Status500InternalServerError, "Unknown server error!")
        };

        httpContext.Response.StatusCode = error.Status;
        await httpContext.Response.WriteAsJsonAsync(error, cancellationToken);

        return true;
    }
}