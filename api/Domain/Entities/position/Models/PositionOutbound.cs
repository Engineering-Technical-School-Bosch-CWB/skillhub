using api.Domain.Services.Pagination;

namespace api.Domain.Models
{
    public class PositionResponse
    {
        public required string Name { get; init; }
    }

    public class PaginatedPositionsResponse
    {
        public required IEnumerable<PositionResponse> Data { get; set; }
        public required PaginationInfo PaginationInfo { get; set; }
    }
}