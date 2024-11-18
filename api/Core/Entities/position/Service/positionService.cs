using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Genesis.Domain.Repositories;
using Api.Core.Repositories;
using Api.Core.Errors;

namespace Api.Core.Services;

public class PositionService(
        BaseRepository<Position> repository)
        : BaseService<Position>(repository), IPositionService
{
    private readonly IPositionRepository _repo = repository is IPositionRepository positionRepository
            ? positionRepository
            : throw new ServiceConfigurationException(
                    nameof(_repo),
                    typeof(IPositionRepository),
                    repository.GetType()
            );

    public PaginatedPositionsResponse GetPaginated(PaginationQuery pagination)
    {
        var result = _repo.GetPaginated(pagination.ToOptions());

        return new PaginatedPositionsResponse()
        {
            Data = result.Item1.Select(PositionResponse.ToResponse),
            PaginationInfo = result.Item2,
        };
    }

    public async Task<PaginatedPositionsResponse> GetPaginatedAsync(PaginationQuery pagination)
    {
        var result = await _repo.GetPaginatedAsync(pagination.ToOptions());

        return new PaginatedPositionsResponse()
        {
            Data = result.Item1.Select(PositionResponse.ToResponse),
            PaginationInfo = result.Item2,
        };
    }
}
