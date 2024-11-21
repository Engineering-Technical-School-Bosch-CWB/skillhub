using Api.Core.Errors;
using Api.Core.Errors.Authentication;
using Api.Core.Errors.JWTService;
using Api.Core.Errors.Login;
using Microsoft.AspNetCore.Diagnostics;

<<<<<<< HEAD
namespace Api.Core.Middlewares;

public record Error(int Status, string Message, Object? Details = null);

public class ErrorHandlingMiddleware : IExceptionHandler
=======
namespace Api.Core.Middlewares
>>>>>>> dev
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var error = exception switch
        {
            DeleteFailException e => new Error(StatusCodes.Status500InternalServerError, e.Message),
            UpsertFailException e => new Error(StatusCodes.Status500InternalServerError, e.Message),
            NotFoundException e => new Error(StatusCodes.Status404NotFound, e.Message),
            AlreadyExistsException e => new Error(StatusCodes.Status400BadRequest, e.Message),

            // ..authorization 
            InvalidTokenException e => new Error(StatusCodes.Status400BadRequest, e.Message),
            InvalidHeadersException e => new Error(StatusCodes.Status401Unauthorized, e.Message),

            // ..login
            UserNotRegisteredException e => new Error(StatusCodes.Status403Forbidden, e.Message),
            NoSuchPositionException e => new Error(StatusCodes.Status404NotFound, e.Message),
            WrongPasswordException e => new Error(StatusCodes.Status401Unauthorized, e.Message),
            
            _ => new Error(StatusCodes.Status500InternalServerError, "Unknown server error.")
        };

        httpContext.Response.StatusCode = error.Status;
        await httpContext.Response.WriteAsJsonAsync(error, cancellationToken);

        return true;
    }
}