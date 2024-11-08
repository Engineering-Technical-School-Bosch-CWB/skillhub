namespace api.Core.Errors.Pagination
{
    public class PaginationOffsetException : Exception
    {
        public PaginationOffsetException(string message) : base(message) { }
    }
}