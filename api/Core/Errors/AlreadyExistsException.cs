namespace Api.Core.Errors;
public class AlreadyExistsException : Exception
{
    public AlreadyExistsException(string message) : base(message) {}
    public AlreadyExistsException(string message, Exception inner): base(message, inner) {}
}