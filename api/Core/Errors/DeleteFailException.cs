namespace Api.Core.Errors;
public class DeleteFailException : Exception
{
    public DeleteFailException(string message): base(message) { }

    public DeleteFailException(string message, Exception inner): base(message, inner) { }
}