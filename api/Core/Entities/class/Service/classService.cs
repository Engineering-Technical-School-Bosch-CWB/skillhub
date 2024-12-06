using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class ClassService(
    BaseRepository<Class> repository, ISkillRepository skillRepository,
    ICourseRepository courseRepository, ISkillResultRepository skillResultRepository
    ) : BaseService<Class>(repository), IClassService
{
    private readonly BaseRepository<Class> _repo = repository;
    private readonly ICourseRepository _courseRepo = courseRepository;
    private readonly ISkillRepository _skillRepo = skillRepository;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;

    public async Task<AppResponse<ClassDTO>> CreateClass(ClassCreatePayload payload)
    {
        var course = await _courseRepo.Get()
            .SingleOrDefaultAsync(c => c.Id == payload.CourseId)
            ?? throw new NotFoundException("Course not found!");

        var newClass = new Class {
            Name = payload.Name,
            Course = course,
            StartingYear = payload.StartingYear,
            DurationPeriods = payload.DurationPeriods
        };

        var createdClass = _repo.Add(newClass)
            ?? throw new UpsertFailException("Class could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<ClassDTO>(
            ClassDTO.Map(createdClass),
            "Class created successfully!"
        );
    }

    public async Task<double?> GetSkillMean(int id, int skillId)
    {
        var skillResults = await _skillResultRepo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Student.Class.Id == id)
            .Where(s => s.Skill.Id == skillId)
            .GroupBy(s => s.Student)
            .Select(g => g.OrderByDescending(s => s.EvaluatedAt).First())
            .ToListAsync();

        return skillResults.Count > 0 ? skillResults.Sum(s => s.Aptitude * s.Weight) / skillResults.Sum(s => s.Weight) : null;
    }

    public double? GetSubjectMean(int id, int subjectId)
    {
        var skillResults = _skillResultRepo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Student.Class.Id == id)
            .Where(s => s.Subject!.Id == subjectId || s.Exam!.Subject.Id == subjectId)
            .AsEnumerable()
            .GroupBy(s => new { s.Student, s.Skill })
            .Select(g => g.OrderByDescending(s => s.EvaluatedAt).First())
            .ToList();

        return skillResults.Count > 0 ? skillResults.Sum(s => s.Aptitude * s.Weight) / skillResults.Sum(s => s.Weight) : null;
    }
}
