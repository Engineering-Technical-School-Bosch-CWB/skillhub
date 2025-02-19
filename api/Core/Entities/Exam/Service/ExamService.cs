using Api.Core.Errors;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class ExamService(BaseRepository<Exam> repository, ISubjectRepository subjectRepository, IUserService userService,
    ISkillRepository skillRepository, ISkillResultRepository skillResultRepository, IUserRepository userRepository
) : BaseService<Exam>(repository), IExamService
{
    private readonly BaseRepository<Exam> _repo = repository;
    private readonly ISkillRepository _skillRepo = skillRepository;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;
    private readonly IUserRepository _userRepo = userRepository;

    private readonly IUserService _userService = userService;

    #region CRUD

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

        var skillResults = new List<SkillResultDTO>();

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

                skillResults.Add(SkillResultDTO.Map(createdSkillResult));
            }
        }

        await _repo.SaveAsync();
        await _skillResultRepo.SaveAsync();

        return new AppResponse<ExamDTO>(
            ExamDTO.Map(createdExam, skillResults),
            "Exam created successfully!"
        );
    }

    public async Task DeleteExam(int examId)
    {
        var exam = await _repo.Get()
            .Where(e => e.IsActive)
            .Include(e => e.SkillResults)
            .SingleOrDefaultAsync(e => e.Id == examId)
            ?? throw new NotFoundException("Exam not found!");

        exam.IsActive = false;

        var deletedExam = _repo.Update(exam)
            ?? throw new DeleteFailException("Exam could not be deleted!");

        foreach (var r in exam.SkillResults)
        {
            r.IsActive = false;
            var deletedSkillResult = _skillResultRepo.Update(r)
                ?? throw new DeleteFailException("Skill result could not be deleted!");
        }

        await _repo.SaveAsync();
    }

    #endregion

    #region Services

    public IEnumerable<ExamSkillDTO> GetExamSkills(int id)
    {
        var skills = _skillResultRepo.Get()
            .Where(e => e.IsActive)
            .Where(e => e.Exam != null && e.Exam.Id == id)
            .Include(e => e.Skill)
            .AsEnumerable()
            .GroupBy(e => e.Skill)
            .Select(g =>
            {
                var first = g.First();

                return new ExamSkillDTO(
                    first.Skill.Id,
                    first.Weight,
                    first.Skill.Description,
                    first.Skill.EvaluationCriteria,
                    g.Average(s => s.Aptitude)
                );
            }).OrderBy(r => r.Id);

        return skills;
    }

    public async Task<ExamResultsDTO> GetClassResults(int id)
    {
        return null;
    }

    #endregion

    #region Pages


    public async Task<AppResponse<EvaluateExamDTO>> GetExamEvaluationPage(int examId)
    {
        var exam = await _repo.Get()
            .Where(e => e.IsActive)
            .Include(e => e.Subject.CurricularUnit)
            .Include(e => e.Subject.Class)
            .SingleOrDefaultAsync(e => e.Id == examId)
            ?? throw new NotFoundException("Exam not found!");

        var results = await _skillResultRepo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Exam!.Id == examId)
            .Include(s => s.Student.User)
            .Include(s => s.Skill)
            .GroupBy(s => s.Student)
            .Select(g => new
            {
                Student = g.Key,
                SkillResults = g.Select(s => SkillResultDTO.Map(s)).AsEnumerable()
            })
            .ToListAsync();

        var orderedResults = results
            .Select(g => ExamEvaluationResultDTO.Map(g.Student, g.SkillResults.OrderBy(s => s.SkillId)))
            .OrderBy(r => r.Student.Name)
            .ToList();

        return new AppResponse<EvaluateExamDTO>(
            EvaluateExamDTO.Map(exam.Subject, exam, orderedResults),
            "Exam results found"
        );
    }

    public async Task<AppResponse<ExamSkillsDTO>> GetCreateExamPage(int subjectId)
    {
        var subject = await _subjectRepo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.CurricularUnit)
            .Include(s => s.Class)
            .Include(s => s.Instructor)
            .SingleOrDefaultAsync(s => s.Id == subjectId)
            ?? throw new NotFoundException("Subject not found!");

        var teachers = await _userService.GetTeachers(subject.Instructor);

        var skills = await _skillRepo.Get()
            .Where(s => s.CurricularUnit.Id == subject.CurricularUnit.Id)
            .Where(s => s.IsActive)
            .Select(s => SkillDTO.Map(s))
            .ToListAsync();

        return new AppResponse<ExamSkillsDTO>(
            ExamSkillsDTO.Map(SubjectDTO.Map(subject), teachers, skills),
            "Skills found!"
        );
    }

    #endregion
}

