using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class SubjectAreaService(
        BaseRepository<SubjectArea> repository,
        IPaginationService paginationService
    )
    : BaseService<SubjectArea>(repository), ISubjectAreaService
{
    private readonly BaseRepository<SubjectArea> _repo = repository;
    private readonly IPaginationService _paginationService = paginationService;

    public async Task<AppResponse<SubjectAreaDTO>> CreateSubjectArea(SubjectAreaPayload payload)
    {
        if (await _repo.GetAllNoTracking().Where(s => s.IsActive).AnyAsync(s => string.Equals(s.Name, payload.Name)))
            throw new AlreadyExistsException("There's already a subject area with this name!");

        var newSubjectArea = new SubjectArea()
        {
            Name = payload.Name
        };

        var savedSubjectArea = _repo.Add(newSubjectArea)
            ?? throw new UpsertFailException("Subject area could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<SubjectAreaDTO>(
            SubjectAreaDTO.Map(savedSubjectArea),
            "Subject area created successfully!"
        );
    }

    public async Task<AppResponse<SubjectAreaDTO>> UpdateSubjectArea(int id, SubjectAreaPayload payload)
    {
        var subjectArea = await _repo.Get()
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Subject area not found!");

        if (!string.Equals(payload.Name, subjectArea.Name) && await _repo.GetAllNoTracking().Where(s => s.IsActive && s.Id != id).AnyAsync(s => string.Equals(s.Name, payload.Name)))
            throw new AlreadyExistsException("There's already a subject area with this name!");

        subjectArea.Name = payload.Name;

        var updatedSubjectArea = _repo.Update(subjectArea)
            ?? throw new UpsertFailException("Subject area could not be updated!");

        await _repo.SaveAsync();

        return new AppResponse<SubjectAreaDTO>(
            SubjectAreaDTO.Map(subjectArea),
            "Subject area updated successfully!"
        );
    }

    public async Task DeleteSubjectArea(int id)
    {
        var subjectArea = await _repo.Get()
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Subject area not found!");

        subjectArea.IsActive = false;

        _ = _repo.Update(subjectArea) ?? throw new DeleteFailException("Subject area could not be deleted");

        await _repo.SaveAsync();
    }

    public async Task<AppResponse<SubjectAreaDTO>> GetSubjectArea(int id)
    {
        var subjectArea = await _repo.Get()
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Subject area not found!");

        return new AppResponse<SubjectAreaDTO>(
            SubjectAreaDTO.Map(subjectArea),
            "Subject area found!"
        );
    }

    public async Task<PaginatedAppResponse<SubjectAreaDTO>> GetAllSubjectAreas(PaginationQuery? pagination)
    {
        var result = await _paginationService.PaginateAsync(
            _repo.Get()
                .Where(s => s.IsActive),
            pagination!.ToOptions()
        );

        var mappedUsers = new List<SubjectAreaDTO>();

        mappedUsers = result.Item1.Select(e => SubjectAreaDTO.Map(e)).ToList();

        return new PaginatedAppResponse<SubjectAreaDTO>(
            mappedUsers,
            result.Item2!,
            "Subject areas found!"
        );
    }
}
