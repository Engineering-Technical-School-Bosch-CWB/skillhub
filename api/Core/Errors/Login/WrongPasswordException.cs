namespace Api.Core.Errors.Pagination
{
    public class WrongPasswordException : Exception
    {
        public WrongPasswordException(string message) : base(message) { }
    }
}