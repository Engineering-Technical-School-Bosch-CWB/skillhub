using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class OccupationAreaService(BaseRepository<OccupationArea> repository,
    IPaginationService paginationService
) : BaseService<OccupationArea>(repository), IOccupationAreaService
{
    private readonly BaseRepository<OccupationArea> _repo = repository;
    private readonly IPaginationService _paginationService = paginationService;

    public PaginatedAppResponse<UpdateOccupationAreaPayload> GetPaginated(PaginationQuery pagination, string? query = null, int? id = null)
    {
        var entities = _repo.Get()
            .Where(e => e.IsActive)
            .Where(e => string.IsNullOrEmpty(query) || EF.Functions.Like(e.Name, $"%{query}%"))
            .OrderByDescending(e => id.HasValue && e.Id == id.Value);

        var result = _paginationService.Paginate(
            entities,
            pagination.ToOptions()
        );

        return new PaginatedAppResponse<UpdateOccupationAreaPayload>
            (
                [.. result.Item1.Select(UpdateOccupationAreaPayload.Map)],
                result.Item2!,
                "Occupation Areas found!"
            );
    }


    public async Task<AppResponse<UpdateOccupationAreaPayload>> UpdateOccupationArea(int id, UpdateOccupationAreaPayload data)
    {
        var entity = _repo.Get()
            .SingleOrDefault(entity => entity.IsActive && entity.Id == id)
                ?? throw new NotFoundException("Occupation Area not found!");

        entity.Name = data.Name;

        _repo.Update(entity);
        await _repo.SaveAsync();

        return new(UpdateOccupationAreaPayload.Map(entity), "Occupation area found!");
    }

    public async Task DeleteOccupationArea(int id)
    {
        var entity = _repo.Get()
            .SingleOrDefault(entity => entity.IsActive && entity.Id == id)
            ?? throw new NotFoundException("Ocupation Area not found!");

        entity.IsActive = false;
        _repo.Update(entity);
        await _repo.SaveAsync();

        return;
    }

    public async Task<AppResponse<OccupationArea>> GetOccupationAreaById(int id)
    {
        var entity = await _repo.Get().SingleOrDefaultAsync(e => e.IsActive && e.Id == id)
        ?? throw new NotFoundException("Occupation Area not found!");

        return new(entity, "Occupation Area found!");
    }

    public async Task<AppResponse<OccupationArea>> CreateOccupationArea(OccupationArea payload)
    {
        payload.IsActive = true;

        if (await repository.GetAllNoTracking().Where(o => o.IsActive).AnyAsync(o => string.Equals(o.Name, payload.Name)))
            throw new AlreadyExistsException("There's already a subject area with this name!");

        var result = repository.Add(payload);

        await repository.SaveAsync();

        return new AppResponse<OccupationArea>(result, "Occupation area created successfully!");

    }
}
