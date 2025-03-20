using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class SectorService(
    BaseRepository<Sector> repository,
    IPaginationService paginationService
)
    : BaseService<Sector>(repository), ISectorService
{
    private readonly IPaginationService _pagService = paginationService;

    public async Task<AppResponse<SectorDTO>> CreateSector(SectorCreatePayload payload)
    {
        if(await repository.Get().AnyAsync(sector => string.Equals(sector.Name, payload.Name)))
            throw new AlreadyExistsException("Name of sector already exists!");

        var sector = new Sector()
        {
            Name = payload.Name,
            IsActive = true,
        };

        var saved = repository.Add(sector)
            ?? throw new UpsertFailException("Sector could not be inserted!");

        await repository.SaveAsync();

        return new AppResponse<SectorDTO>(
            SectorDTO.Map(saved),
            "Sector created successfully!"
        );
    }

    public async Task DeleteSector(int id)
    {
        var sector = await repository.GetAllNoTracking()
            .SingleOrDefaultAsync(sector => sector.IsActive && sector.Id == id)
                ?? throw new NotFoundException("Sector not found!");
        
        sector.IsActive = false;

        var deleted = repository.Update(sector)
            ?? throw new DeleteFailException("Sector could not be deleted");
            
        await repository.SaveAsync();
    }

    public async Task<AppResponse<SectorDTO>> GetSectorById(int id)
    {
        var sector = await repository.GetAllNoTracking()
            .SingleOrDefaultAsync(sector => sector.IsActive && sector.Id == id)
                ?? throw new NotFoundException("Sector not found!");

        return new AppResponse<SectorDTO>(
            SectorDTO.Map(sector),
            "Sector found!"
        );
    }

    public async Task<PaginatedAppResponse<SectorDTO>> GetSectors(PaginationQuery pagination)
    {
        var entities = repository.GetAllNoTracking()
            .Where(sector => sector.IsActive);

        var result = await _pagService.PaginateAsync(
            entities,
            pagination.ToOptions()
        );

        List<SectorDTO> mappedSectors = result.Item1.Select(sector => SectorDTO.Map(sector)).ToList();

        return new PaginatedAppResponse<SectorDTO>(
            mappedSectors,
            result.Item2,
            "Sectors found!"
        );
    }

    public async Task<AppResponse<SectorDTO>> UpdateSector(int id, SectorUpdatePayload payload)
    {
        var exists = await repository.GetAllNoTracking()
            .SingleOrDefaultAsync(sector => sector.Id == id)
                ?? throw new NotFoundException("Sector not found!");
        
        if (!string.IsNullOrEmpty(payload.Name) && !string.Equals(payload.Name, exists.Name))
            exists.Name = payload.Name;


        var updated = repository.Update(exists)
            ?? throw new UpsertFailException("Sector could not be updated!");
        
        await repository.SaveAsync();

        return new AppResponse<SectorDTO>(
            SectorDTO.Map(exists),
            "Sector updated successfully!"
        );
    }
}
