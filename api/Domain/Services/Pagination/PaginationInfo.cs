namespace Api.Domain.Services
{
    public class PaginationInfo
    {
        public int Items { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
    }
}