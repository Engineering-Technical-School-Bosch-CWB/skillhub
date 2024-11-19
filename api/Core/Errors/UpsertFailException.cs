namespace Api.Core.Errors;
public class UpsertFailException : Exception
{
    public UpsertFailException(string message): base(message) { }

    public UpsertFailException(string message, Exception inner): base(message, inner) { }
}