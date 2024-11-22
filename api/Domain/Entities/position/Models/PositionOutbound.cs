using api.Domain.Services.Pagination;
using Api.Domain.Models;

namespace api.Domain.Models
{
    public class PositionResponse
    {
        public required int Id { get; init; }
        public required string Name { get; init; }

        public static PositionResponse ToResponse(Position position)
        {
            return new PositionResponse()
            {
                Id = position.Id,
                Name = position.Name,
            };
        }
    }

    public class PaginatedPositionsResponse
    {
        public required IEnumerable<PositionResponse> Data { get; set; }
        public required PaginationInfo PaginationInfo { get; set; }
    }
}