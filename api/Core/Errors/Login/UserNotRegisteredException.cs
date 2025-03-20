namespace Api.Core.Errors.Login
{
    public class UserNotRegisteredException : Exception
    {
        public UserNotRegisteredException(string message) : base(message) { }
        
        public UserNotRegisteredException(string message, Exception inner) : base(message, inner) { }
    }   
}