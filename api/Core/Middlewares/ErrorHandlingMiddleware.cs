using System.Security.Cryptography;
using Api.Core.Errors;
using Api.Core.Errors.JWTService;
using Microsoft.AspNetCore.Diagnostics;

namespace api.Core.Middlewares
{

    public record Error(int Status, string Message, Object? Details = null);

    public class ErrorHandlingMiddleware : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var error = exception switch
            {
                DeleteFailException e => new Error(StatusCodes.Status500InternalServerError, e.Message),
                UpsertFailException e => new Error(StatusCodes.Status500InternalServerError, e.Message),
                NotFoundException e => new Error(StatusCodes.Status404NotFound, e.Message),
                AlreadyExistsException e => new Error(StatusCodes.Status400BadRequest, e.Message),
                InvalidTokenException e => new Error(StatusCodes.Status400BadRequest, e.Message),
                _ => new Error(StatusCodes.Status500InternalServerError, "Unknown server error.")
            };

            httpContext.Response.StatusCode = error.Status;
            await httpContext.Response.WriteAsJsonAsync(error, cancellationToken);

            return true;
        }
    }
}