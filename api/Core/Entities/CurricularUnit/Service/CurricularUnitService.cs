using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;
using Api.Domain.Repositories;

namespace Api.Core.Services;

public class CurricularUnitService(BaseRepository<CurricularUnit> repository, ISubjectAreaRepository subjectAreaRepository,
    IPaginationService paginationService
) : BaseService<CurricularUnit>(repository), ICurricularUnitService
{
    private readonly BaseRepository<CurricularUnit> _repo = repository;
    private readonly ISubjectAreaRepository _subjectAreaRepo = subjectAreaRepository;
    private readonly IPaginationService _pagService = paginationService;

    #region CRUD

    public async Task<AppResponse<CurricularUnitDTO>> CreateCurricularUnit(CurricularUnitCreatePayload payload)
    {
        var subjectArea = await _subjectAreaRepo.Get()
            .Where(s => s.IsActive && s.Id == payload.SubjectAreaId)
            .SingleOrDefaultAsync()
            ?? throw new NotFoundException("Subject area not found!");

        var curricularUnit = await _repo.Get()
            .Include(c => c.SubjectArea)
            .Where(c => c.IsActive && EF.Functions.Collate(c.Name, "SQL_Latin1_General_CP1_CS_AS") == payload.Name)
            .SingleOrDefaultAsync();

        if (curricularUnit is not null)
            throw new AlreadyExistsException("There's already a curricular unit with this name!");

        var newCurricularUnit = new CurricularUnit()
        {
            Name = payload.Name,
            SubjectArea = subjectArea
        };

        var savedCurricularUnit = _repo.Add(newCurricularUnit)
            ?? throw new UpsertFailException("Curricular unit could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<CurricularUnitDTO>(
            CurricularUnitDTO.Map(savedCurricularUnit),
            "Curricular unit created successfully!"
        );
    }

    public async Task<AppResponse<CurricularUnitDTO>> UpdateCurricularUnit(int id, CurricularUnitUpdatePayload payload)
    {
        var curricularUnit = await _repo.Get()
            .Include(c => c.SubjectArea)
            .Where(c => c.IsActive)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Curricular unit not found!");

        if (!string.IsNullOrEmpty(payload.Name))
        {
            if (await _repo.Get()
                    .Where(c => c.IsActive && EF.Functions.Collate(c.Name, "SQL_Latin1_General_CP1_CS_AS") == payload.Name)
                    .SingleOrDefaultAsync() is not null)
                throw new AlreadyExistsException("There's already a curricular unit with this name!");

            curricularUnit.Name = payload.Name;
        }
    
        if (payload.SubjectAreaId.HasValue)
        {
            var subjectArea = await _subjectAreaRepo.Get()
                .Where(s => s.IsActive && s.Id == payload.SubjectAreaId.Value)
                .SingleOrDefaultAsync()
                ?? throw new NotFoundException("Subject area not found!");

            curricularUnit.SubjectArea = subjectArea;
        }

        var updatedCurricularUnit = _repo.Update(curricularUnit)
            ?? throw new UpsertFailException("Curricular unit could not be updated!");

        await _repo.SaveAsync();

        return new AppResponse<CurricularUnitDTO>(
            CurricularUnitDTO.Map(curricularUnit),
            "Curricular unit updated successfully!"
        );
    }

    public async Task DeleteCurricularUnit(int id)
    {
        var curricularUnit = await _repo.Get()
            .Where(c => c.IsActive)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Curricular unit not found!");

        curricularUnit.IsActive = false;

        _ = _repo.Update(curricularUnit) ?? throw new DeleteFailException("Curricular unit could not be deleted!");

        await _repo.SaveAsync();
    }

    public async Task<AppResponse<CurricularUnitDTO>> GetCurricularUnit(int id)
    {
        var curricularUnit = await _repo.Get()
            .Include(c => c.SubjectArea)
            .Where(c => c.IsActive)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Curricular unit not found!");

        return new AppResponse<CurricularUnitDTO>(
            CurricularUnitDTO.Map(curricularUnit),
            "Curricular unit found!"
        );
    }

    public async Task<PaginatedAppResponse<CurricularUnitDTO>> GetPaginatedCurricularUnits(PaginationQuery pagination, string? query, int? subjectAreaId)
    {
        var result = await _pagService.PaginateAsync(
            _repo.GetAllNoTracking()
                .Include(c => c.SubjectArea)
                .Where(c => string.IsNullOrEmpty(query) || c.Name.Contains(query))
                .Where(c => !subjectAreaId.HasValue || c.SubjectArea.Id == subjectAreaId)
                .Where(c => c.IsActive),
            pagination.ToOptions()
        );

        var mappedCurricularUnits = result.Item1.Select(CurricularUnitDTO.Map);

        return new PaginatedAppResponse<CurricularUnitDTO>(
            mappedCurricularUnits,
            result.Item2!,
            "Curricular units found!"
        );
    }

    #endregion
}
