namespace Api.Core.Errors.Login
{
    public class WrongPasswordException : Exception
    {
        public WrongPasswordException(string message) : base(message) { }
        
        public WrongPasswordException(string message, Exception inner) : base(message, inner) { }
    }   
}