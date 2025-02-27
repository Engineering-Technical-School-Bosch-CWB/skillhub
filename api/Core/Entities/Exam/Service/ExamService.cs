using Api.Core.Errors;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class ExamService(BaseRepository<Exam> repository, ISubjectRepository subjectRepository, IUserService userService,
    ISkillRepository skillRepository, ISkillResultRepository skillResultRepository, IUserRepository userRepository, IStudentResultService studentResultService
) : BaseService<Exam>(repository), IExamService
{
    private readonly BaseRepository<Exam> _repo = repository;
    private readonly ISkillRepository _skillRepo = skillRepository;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;
    private readonly IUserRepository _userRepo = userRepository;

    private readonly IUserService _userService = userService;
    private readonly IStudentResultService _studentResultService = studentResultService;

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
            AppliedAt = payload.AppliedAt
        };

        var createdExam = _repo.Add(newExam)
            ?? throw new UpsertFailException("Exam could not be inserted!");

        var skillResults = new List<SkillResultDTO>();

        var payloadSkills = payload.Skills
            .GroupBy(s => s.SkillId)
            .Select(s => s.Last());

        foreach (var obj in payloadSkills)
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

    public async Task<AppResponse<ExamDTO>> UpdateExam(int id, ExamUpdatePayload payload)
    {
        var exam = await _repo.Get()
            .Where(e => e.IsActive)
            .Include(e => e.Instructor)
            .Include(e => e.SkillResults)
                .ThenInclude(s => s.Skill)
            .Include(e => e.SkillResults)
                .ThenInclude(s => s.Student)
            .Include(e => e.Subject.Class.Students)
            .Include(e => e.Subject.CurricularUnit)
            .SingleOrDefaultAsync(e => e.Id == id)
            ?? throw new NotFoundException("Exam not found!");

        if (payload.InstructorId.HasValue)
        {
            exam.Instructor = await _userRepo.Get()
                .Where(u => u.IsActive && u.Id == payload.InstructorId.Value)
                .SingleOrDefaultAsync()
                ?? throw new NotFoundException("Instructor not found!");
        }

        exam.Name = payload.Name ?? exam.Name;
        exam.Description = payload.Description ?? exam.Description;
        exam.AppliedAt = payload.AppliedAt ?? exam.AppliedAt;

        if (payload.Skills is not null)
        {
            var payloadSkills = payload.Skills
                .GroupBy(s => s.SkillId)
                .ToDictionary(s => s.Key, s => s.First().Weight);

            HashSet<int> existingSkills = [];

            foreach (var result in exam.SkillResults.Where(s => s.IsActive))
            {
                if (!payloadSkills.TryGetValue(result.Skill.Id, out var weight))
                    result.IsActive = false;
                else
                {
                    if (weight != result.Weight)
                        result.Weight = weight ?? 1;

                    existingSkills.Add(result.Skill.Id);
                }
            }

            var newSkills = payload.Skills.Where(s => !existingSkills.Contains(s.SkillId)).ToList();

            if (newSkills.Count != 0)
            {
                var skillIds = newSkills.Select(s => s.SkillId).ToHashSet();
                var skills = await _skillRepo.Get()
                    .Where(s => s.IsActive && skillIds.Contains(s.Id))
                    .ToDictionaryAsync(s => s.Id);

                foreach (var newSkill in newSkills)
                {
                    if (!skills.TryGetValue(newSkill.SkillId, out var skill))
                        throw new NotFoundException($"Skill with ID {newSkill.SkillId} not found!");

                    foreach (var student in exam.Subject.Class.Students)
                    {
                        exam.SkillResults.Add(new SkillResult
                        {
                            Student = student,
                            Skill = skill,
                            Weight = newSkill.Weight ?? 1,
                            Aptitude = null,
                            IsActive = true
                        });
                    }
                }
            }
        }

        await _studentResultService.AttExamResult(exam);

        repository.Update(exam);
        await repository.SaveAsync();

        return new AppResponse<ExamDTO>(
            ExamDTO.Map(exam, exam.SkillResults.Select(SkillResultDTO.Map)),
            "Exam created successfully!"
        );

    }

    public async Task DeleteExam(int id)
    {
        var exam = await _repo.Get()
            .Where(e => e.IsActive)
            .Include(e => e.SkillResults)
            .SingleOrDefaultAsync(e => e.Id == id)
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
            .Where(s => s.IsActive)
            .Where(s => s.CurricularUnit.Id == subject.CurricularUnit.Id)
            .Select(s => new SelectSkillDTO(false, SkillDTO.Map(s, null)))
            .ToListAsync();

        return new AppResponse<ExamSkillsDTO>(
            ExamSkillsDTO.Map(SubjectDTO.Map(subject), teachers, skills),
            "Skills found!"
        );
    }

    public async Task<AppResponse<EditExamDTO>> GetEditExamPage(int id)
    {
        var exam = await _repo.Get()
            .Where(e => e.IsActive)
            .Include(e => e.Instructor)
            .Include(e => e.Subject.CurricularUnit)
            .Include(e => e.Subject.Class)
            .Include(e => e.SkillResults)
                .ThenInclude(s => s.Skill)
            .SingleOrDefaultAsync(e => e.Id == id)
            ?? throw new NotFoundException("Exam not found!");

        var teachers = await _userService.GetTeachers(exam.Instructor);

        var selectedSkills = exam.SkillResults
            .Where(s => s.IsActive)
            .GroupBy(s => s.Skill.Id)
            .Select(s => new { s.First().Skill.Id, s.First().Weight })
            .ToDictionary(s => s.Id, s => s.Weight);

        var skills = await _skillRepo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.CurricularUnit.Id == exam.Subject.CurricularUnit.Id)
            .ToListAsync();

        var weigthSkills = skills
            .Select(s => new SelectSkillDTO(
                selectedSkills.ContainsKey(s.Id),
                SkillDTO.Map(s, selectedSkills.TryGetValue(s.Id, out var value) ? value : null)
            ));

        return new AppResponse<EditExamDTO>(
            EditExamDTO.Map(exam, ExamSkillsDTO.Map(SubjectDTO.Map(exam.Subject), teachers, weigthSkills)),
            "Skills found!"
        );
    }

    #endregion
}

