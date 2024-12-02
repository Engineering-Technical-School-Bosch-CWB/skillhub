using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;
using System.Threading.RateLimiting;

namespace Api.Core.Services;
public class SkillService(BaseRepository<Skill> repository, ICurricularUnitRepository curricularUnitRepository,
    IPaginationService paginationService)
: BaseService<Skill>(repository), ISkillService
{
    private readonly BaseRepository<Skill> _repo = repository;
    private readonly ICurricularUnitRepository _curricularUnitRepo = curricularUnitRepository;
    private readonly IPaginationService _pagService = paginationService;


    public async Task<AppResponse<SkillDTO>> CreateSkill(SkillCreatePayload payload)
    {
        var curricularUnit = await _curricularUnitRepo.Get()
            .Where(c => c.IsActive)
            .SingleOrDefaultAsync(c => c.Id == payload.CurricularUnitId)
            ?? throw new NotFoundException("Curricular unit not found!");

        var newSkill = new Skill()
        {
            Description = payload.Description,
            EvaluationCriteria = payload.EvaluationCriteria,
            CurricularUnit = curricularUnit
        };

        var savedSkill = _repo.Add(newSkill)
            ?? throw new UpsertFailException("Skill could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<SkillDTO>(
            SkillDTO.Map(savedSkill),
            "Skill created successfully!"
        );
    }

    public async Task DeleteSkill(int id)
    {
        var skill = await _repo.Get()
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Skill not found!");

        skill.IsActive = false;

        _ = _repo.Update(skill) ?? throw new DeleteFailException("Skill could not be deleted!");

        await _repo.SaveAsync();
    }

    public async Task<AppResponse<SkillResponse>> GetByCurricularUnit(int curricularUnitId)
    {
        var curricularUnit = await _curricularUnitRepo.Get()
            .SingleOrDefaultAsync(c => c.Id == curricularUnitId)
            ?? throw new NotFoundException("Curricular unit not found!");

        var skills = await _repo.Get()
            .Where(s => s.CurricularUnit == curricularUnit)
            .Where(s => s.IsActive)
            .Select(s => SkillDTO.Map(s))
            .ToListAsync();

        return new AppResponse<SkillResponse>(
            SkillResponse.Map(curricularUnit, skills),
            "Skills found!"
        );
    }

    public async Task<AppResponse<SkillDTO>> GetSkill(int id)
    {
        var skill = await _repo.Get()
            .Include(s => s.CurricularUnit)
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Skill not found!");

        return new AppResponse<SkillDTO>(
            SkillDTO.Map(skill),
            "Skill found!"
        );
    }

    public async Task<AppResponse<SkillDTO>> UpdateSkill(int id, SkillUpdatePayload payload)
    {
        var skill = await _repo.Get()
            .Include(s => s.CurricularUnit)
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Skill not found!");

        if (!string.IsNullOrEmpty(payload.Description)) 
            skill.Description = payload.Description;

        if (!string.IsNullOrEmpty(payload.EvaluationCriteria))
            skill.EvaluationCriteria = payload.EvaluationCriteria;

        if (payload.CurricularUnitId.HasValue)
        {
            var curricularUnit = await _curricularUnitRepo.Get()
                .Where(c => c.IsActive)
                .SingleOrDefaultAsync(c => c.Id == payload.CurricularUnitId)
                ?? throw new NotFoundException("Curricular unit not found!");

            skill.CurricularUnit = curricularUnit;
        }

        await _repo.SaveAsync();

        return new AppResponse<SkillDTO>(
            SkillDTO.Map(skill),
            "Skill updated successfully!"
        );
    }
}
