using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
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

    public PaginatedAppResponse<PositionDTO> GetPaginated(PaginationQuery pagination)
    {
        var result = _repo.GetPaginated(pagination.ToOptions());

        return new PaginatedAppResponse<PositionDTO>(
            result.Item1.Select(p => PositionDTO.Map(p)),
            result.Item2,
            "Positions found!"
        );
    }

    public async Task<PaginatedAppResponse<PositionDTO>> GetPaginatedAsync(PaginationQuery pagination)
    {
        var result = await _repo.GetPaginatedAsync(pagination.ToOptions());

        return new PaginatedAppResponse<PositionDTO>(
            result.Item1.Select(p => PositionDTO.Map(p)),
            result.Item2,
            "Positions found!"
        );
    }
}
