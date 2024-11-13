namespace api.Core.Errors.Pagination
{
    public class InvalidHeadersException : Exception
    {
        public InvalidHeadersException(string message) : base(message) { }
    }
}