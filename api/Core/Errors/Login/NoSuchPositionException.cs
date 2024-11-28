namespace Api.Core.Errors.Login
{
    public class NoSuchPositionException : Exception
    {
        public NoSuchPositionException(string message) : base(message) { }
        
        public NoSuchPositionException(string message, Exception inner) : base(message, inner) { }
    }   
}