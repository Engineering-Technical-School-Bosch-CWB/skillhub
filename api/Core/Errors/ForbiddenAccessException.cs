namespace Api.Core.Errors;
public class ForbiddenAccessException : Exception
{
    public ForbiddenAccessException(string message): base(message) { }

    public ForbiddenAccessException(string message, Exception inner): base(message, inner) { }
}