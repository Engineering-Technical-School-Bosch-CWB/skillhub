namespace Api.Core.Errors.Authentication
{
    public class InvalidHeadersException : Exception
    {
        public InvalidHeadersException(string message) : base(message) { }
    }
}