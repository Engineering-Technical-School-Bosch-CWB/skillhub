using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Api.Core.Errors;
using AutoMapper;
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

    public override Task<Position> AddAsync(Position entity)
    {
        if(entity.PositionLevel == 1) {
            var repoEntity = repository.Get().FirstOrDefaultAsync(position => position.PositionLevel == 1);
            if(repoEntity is not null)
                throw new AlreadyExistsException("Position with this level already exists!");
        }
        
        return base.AddAsync(entity);
    }

    public async Task<AppResponse<PositionDTO>> Get(int id)
    {
        var position = await _repo.Get().SingleOrDefaultAsync(p => p.Id.Equals(id))
            ?? throw new NotFoundException("Position not found!");

        return new AppResponse<PositionDTO>(
            PositionDTO.Map(position),
            "Position found!"
        );
    }

    public PaginatedAppResponse<PositionDTO> GetPaginated(PaginationQuery pagination)
    {
        var result = _repo.GetPaginated(pagination.ToOptions());

        return new PaginatedAppResponse<PositionDTO>(
            result.Item1.Select(p => PositionDTO.Map(p)),
            result.Item2!,
            "Positions found!"
        );
    }

    public async Task<PaginatedAppResponse<PositionDTO>> GetPaginatedAsync(PaginationQuery pagination)
    {
        var result = await _repo.GetPaginatedAsync(pagination.ToOptions());

        return new PaginatedAppResponse<PositionDTO>(
            result.Item1.Select(p => PositionDTO.Map(p)),
            result.Item2!,
            "Positions found!"
        );
    }

    public void SoftDelete(int id)
    {
        var position = repository.GetAllNoTracking()
            .Where(p => p.IsActive)
            .SingleOrDefault(p => p.Id.Equals(id))
            ?? throw new NotFoundException("Position not found!");
        
        if (!position.IsActive)
            throw new NotFoundException("Position not found!");
        
        position.IsActive = false;

        repository.Update(position);
        repository.Save();
    }

    public async Task SoftDeleteAsync(int id)
    {
        var position = await repository.GetAllNoTracking()
            .Where(p => p.IsActive)
            .SingleOrDefaultAsync(p => p.Id.Equals(id))
            ?? throw new NotFoundException("Position not found!");
        
        if (!position.IsActive)
            throw new NotFoundException("Position not found!");
        
        position.IsActive = false;

        repository.Update(position);
        await repository.SaveAsync();
    }

    public async Task<AppResponse<PositionDTO>> UpdatePositionAsync(int id, PositionUpdatePayload payload)
    {
        var currentPosition = await _repo.Get()
            .Where(p => p.IsActive)
            .SingleOrDefaultAsync(p => p.Id.Equals(id))
            ?? throw new NotFoundException("Position not found.");

        if (!string.IsNullOrEmpty(payload.Name))
            currentPosition.Name = payload.Name;

        if (payload.PositionLevel is not null)
            currentPosition.PositionLevel = (short)payload.PositionLevel.Value;

        var result = _repo.Update(currentPosition)
                ?? throw new UpsertFailException("Could not update position!");
        
        await _repo.SaveAsync();

        return new AppResponse<PositionDTO>(
            PositionDTO.Map(result), 
            "Position updated successfully!");
    }
}
