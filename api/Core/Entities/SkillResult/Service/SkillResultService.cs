using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class SkillResultService(BaseRepository<SkillResult> repository, ISkillRepository skillRepository)
    : BaseService<SkillResult> (repository), ISkillResultService
{

    private readonly BaseRepository<SkillResult> _repo = repository;
    private readonly ISkillRepository _skillRepo = skillRepository;

    public async Task<AppResponse<SkillHistoryResponse>> GetSkillResultHistory(int studentId, int skillId)
    {
        var skill = _skillRepo.Get()
            .Include(s => s.CurricularUnit)
            .Where(s => s.IsActive)
            .SingleOrDefault(s => s.Id == skillId)
            ?? throw new NotFoundException("Skill not found!");

        var history = await _repo.Get()
            .Include(s => s.Exam)
            .Include(s => s.Objection)
            .Where(s => s.IsActive)
            .Where(s => s.Student.Id == studentId)
            .OrderByDescending(s => s.EvaluatedAt)
            .Select(s => SkillResultHistoryDTO.Map(s))
            .ToListAsync();

        return new AppResponse<SkillHistoryResponse>(
            SkillHistoryResponse.Map(SkillDTO.Map(skill), history),
            "Skill history found!"
        );
    }
}
