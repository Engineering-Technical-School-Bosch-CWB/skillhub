namespace api.Core.Errors.Pagination
{
    public class UserNotRegisteredException : Exception
    {
        public UserNotRegisteredException(string message) : base(message) { }
    }
}