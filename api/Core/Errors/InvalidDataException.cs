namespace Api.Core.Errors;
public class InvalidDataException : Exception
{
    public InvalidDataException(string message) : base(message) {}
    public InvalidDataException(string message, Exception inner): base(message, inner) {}
}