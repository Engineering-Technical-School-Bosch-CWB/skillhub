namespace api.Core.Errors.Pagination
{
    public class UnnauthorizedException : Exception
    {
        public UnnauthorizedException(string message) : base(message) { }
    }
}