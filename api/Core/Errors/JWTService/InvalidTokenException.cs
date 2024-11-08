namespace Api.Core.Errors.JWTService
{
    public class InvalidTokenException : Exception
    {
        public InvalidTokenException(string message) : base(message) { }
        
        public InvalidTokenException(string message, Exception inner) : base(message, inner) { }
    }   
}