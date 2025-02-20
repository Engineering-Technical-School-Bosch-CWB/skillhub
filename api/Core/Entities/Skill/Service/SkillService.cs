using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;
using Api.Domain.Enums;

namespace Api.Core.Services;
public class SkillService(BaseRepository<Skill> repository, ICurricularUnitRepository curricularUnitRepository,
    ISubjectRepository subjectRepository, IUserRepository userRepository, ISkillResultRepository skillResultRepository,
    IPaginationService paginationService
        ) : BaseService<Skill>(repository), ISkillService
{
    private readonly BaseRepository<Skill> _repo = repository;
    private readonly ICurricularUnitRepository _curricularUnitRepo = curricularUnitRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;
    private readonly IUserRepository _userRepo = userRepository;
    private readonly IPaginationService _pageService = paginationService;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;


    #region CRUD

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

    public async Task<PaginatedAppResponse<SkillDTO>> GetByCurricularUnit(PaginationQuery pagination, int id)
    {
        var curricularUnit = await _curricularUnitRepo.Get()
            .SingleOrDefaultAsync(c => c.Id == id && c.IsActive)
                ?? throw new NotFoundException("Curricular Unit Not found!");
        
        var skills = repository.Get()
            .Where(skill => skill.IsActive == true)
            .Where(skill => skill.CurricularUnit.Id == id  );

        var result = await _pageService.PaginateAsync(
            skills,
            pagination.ToOptions()
        );

        var maped = result.Item1.Select(_e => SkillDTO.Map(_e)).ToList();

        return new PaginatedAppResponse<SkillDTO>(
            maped,
            result.Item2,
            "Skills found!"
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

    #endregion

    #region Services

    public double? GetSkillAverageByClass(int skillId, int classId)
    {
        var average = _skillResultRepo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Skill.Id == skillId)
            .Where(s => s.Student.Class.Id == classId)
            .GroupBy(s => s.Student)
            .Select(g => g.OrderByDescending(s => s.Aptitude).First())
            .AsEnumerable()
            .Average(s => s.Aptitude);

        return average;
    }

    #endregion

    #region Pages

    

    #endregion
}
