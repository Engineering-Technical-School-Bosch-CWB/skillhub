namespace Api.Core.Errors
{
    public class InvalidFormatException : Exception
    {
        public InvalidFormatException(string message) : base(message) {}

        public InvalidFormatException(string message, Exception inner): base(message, inner) {}
    }
}