using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using api.Domain.Models;
using api.Domain.Services.Pagination;
using Api.Domain.Repositories;
using Api.Core.Errors;
using AutoMapper;
using api.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class PositionService
        : BaseService<Position>, IPositionService
{
    private readonly IPositionRepository _repo;
    private readonly Mapper _mapper;
    
    public PositionService(
        BaseRepository<Position> repository) : base(repository)
    {
        _repo = repository is IPositionRepository positionRepository
            ? positionRepository
            : throw new ServiceConfigurationException(
                    nameof(_repo),
                    typeof(IPositionRepository),
                    repository.GetType()
            );
        
        var mapConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<PositionMapperConfig>();
            });
            
        _mapper = new Mapper(mapConfig);
    }

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

    public void SoftDelete(int id)
    {
        var position = repository.GetAllNoTracking()
                .SingleOrDefault(p => p.Id.Equals(id))
                    ?? throw new NotFoundException("Position not found.");
        
        if (!position.IsActive)
            throw new NotFoundException("Position not found.");
        
        position.IsActive = false;

        repository.Update(position);
        repository.Save();
    }

    public async Task SoftDeleteAsync(int id)
    {
        var position = await repository.GetAllNoTracking()
                .SingleOrDefaultAsync(p => p.Id.Equals(id))
                    ?? throw new NotFoundException("Position not found.");
        
        if (!position.IsActive)
            throw new NotFoundException("Position not found.");
        
        position.IsActive = false;

        repository.Update(position);
        await repository.SaveAsync();
    }

    public async Task<PositionResponse> UpdatePositionAsync(int id, PositionPayload payload)
    {
        var newPosition = new Position
        {
            Id = id
        };
        _mapper.Map(payload, newPosition);

        var result = _repo.Update(newPosition)
                ?? throw new UpsertFailException("Could not update position.");
        
        await _repo.SaveAsync();

        return PositionResponse.ToResponse(result);
    }
}
