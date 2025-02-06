using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class OccupationAreaService(BaseRepository<OccupationArea> repository,
        IPaginationService paginationService
    )
    : BaseService<OccupationArea>(repository), IOccupationAreaService

{
    private readonly IPaginationService _paginationService = paginationService;


    public PaginatedAppResponse<UpdateOcupationAreaPayload> GetPaginated(PaginationQuery pagination, string? query)
    {
        var entities = repository.Get()
            .Where(e => e.IsActive && 
                (string.IsNullOrEmpty(query) || EF.Functions.Like(e.Name, $"%{query}%")
            ));

        var result = _paginationService.Paginate(
            entities,
            pagination.ToOptions()
        );

        List<UpdateOcupationAreaPayload> mappedEntities = result.Item1.Select(e => UpdateOcupationAreaPayload.Map(e)).ToList();

        return new PaginatedAppResponse<UpdateOcupationAreaPayload>
            (
                mappedEntities,
                result.Item2,
                "Occupation Areas found!"
            );

    }
    public async Task<AppResponse<UpdateOcupationAreaPayload>> UpdateOccupationArea(int id, UpdateOcupationAreaPayload data)
    {
        var entity = repository.Get()
            .SingleOrDefault(entity => entity.IsActive && entity.Id == id)
                ?? throw new NotFoundException("Occupation Area not found!");

        entity.Name = data.Name;

        repository.Update(entity);
        await repository.SaveAsync();

        return new(UpdateOcupationAreaPayload.Map(entity), "Occupation area found!");
    }

    public async Task DeleteOccupationArea(int id)
    {
        var entity = repository.Get()
            .SingleOrDefault(entity => entity.IsActive && entity.Id == id)
                ?? throw new NotFoundException("Ocupation Area not found!");

        entity.IsActive = false;
        repository.Update(entity);
        await repository.SaveAsync();

        return;
    }

    public async Task<AppResponse<OccupationArea>> GetOccupationAreaById(int id)
    {
        var entity = await repository.Get().SingleOrDefaultAsync(e => e.IsActive && e.Id == id)
            ?? throw new NotFoundException("Occupation Area not found!");
        return new (entity, "Occupation Area found!");
    }
}
