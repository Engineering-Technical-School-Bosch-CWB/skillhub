namespace Api.Core.Errors;
public class UnknownServerError : Exception
{
    public UnknownServerError(string message): base(message) { }

    public UnknownServerError(string message, Exception inner): base(message, inner) { }
}