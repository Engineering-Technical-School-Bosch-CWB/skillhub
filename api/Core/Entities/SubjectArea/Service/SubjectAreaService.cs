using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class SubjectAreaService(BaseRepository<SubjectArea> repository)
    : BaseService<SubjectArea>(repository), ISubjectAreaService
{
    private readonly BaseRepository<SubjectArea> _repo = repository;

    public async Task<AppResponse<SubjectAreaDTO>> CreateSubjectArea(SubjectAreaPayload payload)
    {
        var subjectArea = await _repo.Get()
            .Where(s => s.IsActive && s.Name == payload.Name)
            .SingleOrDefaultAsync();

        if (subjectArea is not null)
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

    public async Task<AppResponse<IEnumerable<SubjectAreaDTO>>> GetAllSubjectAreas()
    {
        var subjectAreas = await _repo.Get()
            .Where(s => s.IsActive)
            .Select(s => SubjectAreaDTO.Map(s))
            .ToListAsync();

        return new AppResponse<IEnumerable<SubjectAreaDTO>>(
            subjectAreas,
            "Subject areas found!"
        );
    }
}
