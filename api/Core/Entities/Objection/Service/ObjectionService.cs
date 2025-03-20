using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Api.Core.Errors;

namespace Api.Core.Services;

public class ObjectionService(BaseRepository<Objection> repository, ISkillResultRepository skillResultRepository)
    : BaseService<Objection> (repository), IObjectionService
{
    private readonly BaseRepository<Objection> _repo = repository;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;

    public async Task<AppResponse<ObjectionDTO>> CreateObjection (ObjectionPayload payload)
    {
        var skillResult = _skillResultRepo.Get()
            .Where(s => s.IsActive)
            .SingleOrDefault(s => s.Id == payload.SkillResultId)
            ?? throw new NotFoundException("Skill result not found!");

        var newObjection = new Objection()
        {
            ClaimedAptitude = (short)payload.ClaimedAptitude,
            OfficialAptitude = (short)skillResult.Aptitude!,
            ObjectedAt = DateOnly.FromDateTime(DateTime.Now),
            SkillResult = skillResult
        };

        var savedObjection = _repo.Add(newObjection)
            ?? throw new UpsertFailException("Objection could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<ObjectionDTO>(
            ObjectionDTO.Map(savedObjection),
            "Objection created successfully!"
        );
    }
}
