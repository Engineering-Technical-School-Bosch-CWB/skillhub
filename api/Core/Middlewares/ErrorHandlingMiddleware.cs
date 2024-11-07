using System.Security.Cryptography;
using Microsoft.AspNetCore.Diagnostics;

namespace api.Core.Middlewares
{

    public record Error(int Status, string Message, Object Details = null);

    public class ErrorHandlingMiddleware : IExceptionHandler
    {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var error = exception switch
            {
                _ => new Error(StatusCodes.Status500InternalServerError, "Unknown server error.")
            };

            httpContext.Response.StatusCode = error.Status;
            await httpContext.Response.WriteAsJsonAsync(error, cancellationToken);

            return true;
        }
    }
}