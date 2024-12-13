using Api.Core.Errors;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class ExamService(BaseRepository<Exam> repository, ISubjectRepository subjectRepository,
        ISkillRepository skillRepository, ISkillResultRepository skillResultRepository, IUserRepository userRepository
    ) : BaseService<Exam>(repository), IExamService
{
    private readonly BaseRepository<Exam> _repo = repository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;
    private readonly ISkillRepository _skillRepo = skillRepository;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;
    private readonly IUserRepository _userRepo = userRepository;

    public async Task<AppResponse<ExamDTO>> CreateExam(ExamCreatePayload payload)
    {
        var subject = await _subjectRepo.Get()
            .Include(s => s.Class.Students)
            .Include(s => s.Instructor)
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == payload.SubjectId)
            ?? throw new NotFoundException("Subject not found!");

        var instructor = payload.InstructorId.HasValue
            ? await _userRepo.Get().Where(u => u.IsActive).SingleOrDefaultAsync(u => u.Id == payload.InstructorId.Value)
            ?? throw new NotFoundException("Instructor not found!")
            : subject.Instructor;

        var newExam = new Exam()
        {
            Name = payload.Name,
            Description = payload.Description,
            Instructor = instructor,
            Subject = subject,
            AppliedAt = payload.ApliedAt
        };

        var createdExam = _repo.Add(newExam)
            ?? throw new UpsertFailException("Exam could not be inserted!");

        var skillResults = new List<NewSkillResultDTO>();

        foreach (var obj in payload.Skills)
        {
            var skill = await _skillRepo.Get()
                .Where(s => s.IsActive)
                .SingleOrDefaultAsync(s => s.Id == obj.SkillId)
                ?? throw new NotFoundException("Skill not found!");

            foreach (var student in subject.Class.Students)
            {
                var skillResult = new SkillResult()
                {
                    Weight = obj.Weight ?? 1,
                    Skill = skill,
                    Student = student,
                    Exam = createdExam
                };

                var createdSkillResult = _skillResultRepo.Add(skillResult)
                    ?? throw new UpsertFailException("Skill result could not be inserted!");

                skillResults.Add(NewSkillResultDTO.Map(createdSkillResult));
            }
        }

        await _repo.SaveAsync();
        await _skillResultRepo.SaveAsync();

        return new AppResponse<ExamDTO>(
            ExamDTO.Map(createdExam, skillResults),
            "Exam created successfully!"
        );
    }
}
