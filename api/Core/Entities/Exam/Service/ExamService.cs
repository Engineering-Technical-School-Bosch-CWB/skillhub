

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
    ) : BaseService<Exam> (repository), IExamService
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

        var skills = new List<Skill>();

        foreach (var id in payload.Skills)
            skills.Add(
                await _skillRepo.Get()
                    .Where(s => s.IsActive)
                    .SingleOrDefaultAsync(s => s.Id == id)
                ?? throw new NotFoundException("Skill not found!")
            );

        var instructor = payload.InstructorId.HasValue
            ? await _userRepo.Get().Where(u => u.IsActive).SingleOrDefaultAsync(u => u.Id == payload.InstructorId.Value)
            ?? throw new NotFoundException("Instructor not found!")
            : subject.Instructor;

        var newExam = new Exam()
        {
            Name = payload.Name,
            Description = payload.Description,
            Instructor = instructor,
            Subject = subject
        };

        foreach (var skill in skills)
        {
            foreach (var student in subject.Class.Students)
            {
                
            }
        }
    }
}
