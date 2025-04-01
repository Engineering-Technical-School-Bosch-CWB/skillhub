using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;
using Newtonsoft.Json;

namespace Api.Core.Services;

public class SubjectService(BaseRepository<Subject> repository, IUserRepository userRepository, IStudentService studentService,
    IFeedbackRepository feedbackRepository, ICurricularUnitRepository curricularUnitRepository, IClassRepository classRepository, IStudentResultRepository studentResultRepository,
    IExamService examService, IStudentRepository studentRepository, IPaginationService paginationService
) : BaseService<Subject>(repository), ISubjectService
{
    private readonly BaseRepository<Subject> _repo = repository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly ICurricularUnitRepository _curricularUnitRepo = curricularUnitRepository;
    private readonly IUserRepository _userRepo = userRepository;
    private readonly IStudentRepository _studentRepo = studentRepository;
    private readonly IPaginationService _pagService = paginationService;
    private readonly IFeedbackRepository _feedbackRepo = feedbackRepository;
    private readonly IStudentResultRepository _studentResultRepo = studentResultRepository;

    private readonly IExamService _examService = examService;
    private readonly IStudentService _studentService = studentService;

    #region CRUD


    public async Task<AppResponse<IEnumerable<SubjectDTO>>> CreateSubjectsByClass(IEnumerable<SubjectCreateByClassPayload> payload, int idClass)
    {
        var _class = await _classRepo.Get()
            .SingleOrDefaultAsync(c => c.IsActive && c.Id == idClass)
                ?? throw new NotFoundException("Class not found!");


        List<Subject> subjects = payload.Select(s => new Subject()
        {
            DurationHours = s.Time,
            Class = _class,
            CurricularUnit = _curricularUnitRepo.Get().SingleOrDefault(c => c.IsActive && c.Id == s.CurricularUnitId)
                ?? throw new NotFoundException($"Curricular Unit not found: {s.CurricularUnitId}")
        }).ToList();

        List<Subject> inserted = [];

        foreach (var item in subjects)
        {
            var entity = _repo.Add(item);
            inserted.Add(entity);
        }

        await _repo.SaveAsync();

        return new AppResponse<IEnumerable<SubjectDTO>>(
            inserted.Select(e => SubjectDTO.Map(e)),
            "Subjects inserted successfully!"
        );
    }


    public async Task<AppResponse<SubjectDTO>> CreateSubject(SubjectCreatePayload payload)
    {
        var instructor = await _userRepo.Get()
            .SingleOrDefaultAsync(u => u.Id == payload.InstructorId)
            ?? throw new NotFoundException("Instructor not found!");

        var curricularUnit = await _curricularUnitRepo.Get()
            .SingleOrDefaultAsync(c => c.Id == payload.CurricularUnitId)
            ?? throw new NotFoundException("Curricular Unit not found!");

        var subjectClass = await _classRepo.Get()
            .SingleOrDefaultAsync(c => c.Id == payload.ClassId)
            ?? throw new NotFoundException("Class not found!");

        var newSubject = new Subject
        {
            Instructor = instructor,
            CurricularUnit = curricularUnit,
            Class = subjectClass,
            Period = payload.Period,
            DurationHours = payload.DurationHours,
            BeganAt = payload.BeganAt
        };

        var createdSubject = _repo.Add(newSubject)
            ?? throw new UpsertFailException("Subject could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<SubjectDTO>(
            SubjectDTO.Map(createdSubject),
            "Subject created successfully!"
        );
    }

    public async Task<AppResponse<SubjectDTO>> UpdateSubject(int id, SubjectUpdatePayload payload)
    {
        var subject = await _repo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.Instructor)
            .Include(s => s.CurricularUnit)
            .Include(s => s.Class)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Subject not found!");

        if (payload.Period.HasValue && payload.Period.Value != subject.Period)
            subject.Period = payload.Period.Value;

        if (payload.DurationHours.HasValue && payload.DurationHours.Value != subject.DurationHours)
            subject.DurationHours = payload.DurationHours.Value;

        if (payload.BeganAt.HasValue && payload.BeganAt.Value != subject.BeganAt)
            subject.BeganAt = payload.BeganAt.Value;

        if (payload.InstructorId.HasValue && payload.InstructorId.Value != subject.Instructor?.Id)
        {
            var instructor = await _userRepo.Get()
                .Where(u => u.IsActive)
                .SingleOrDefaultAsync(u => u.Id == payload.InstructorId.Value)
                ?? throw new NotFoundException("Instructor not found!");

            subject.Instructor = instructor;
        }

        _repo.Update(subject);
        await _repo.SaveAsync();

        return new AppResponse<SubjectDTO>(
            SubjectDTO.Map(subject),
            "Subject updated successfully!"
        );
    }

    public async Task<PaginatedAppResponse<SubjectDTO>> GetSubjectPaginated(PaginationQuery pagination, int classId, int? studentId, string? query = null)
    {
        var result = await _pagService.PaginateAsync(
           _repo.GetAllNoTracking()
               .Include(s => s.CurricularUnit)
               .Include(s => s.Class)
               .Where(s => s.Class.Id == classId)
               .Where(s => string.IsNullOrEmpty(query) || EF.Functions.Like(s.CurricularUnit.Name, $"%{query}%"))
               .Where(s => s.IsActive),
           pagination.ToOptions()
       );

        if (studentId.HasValue)
        {
            var hasFeedback = await _feedbackRepo.Get()
                .Where(f => f.IsActive)
                .Where(f => f.Student.Id == studentId)
                .Where(f => f.Subject != null)
                .Select(f => f.Subject!.Id)
                .ToListAsync();

            result.Item1 = [.. result.Item1.ExceptBy(hasFeedback, s => s.Id)];
        }

        return new PaginatedAppResponse<SubjectDTO>(
            result.Item1.Select(SubjectDTO.Map),
            result.Item2!,
            "Subjects found!"
        );
    }

    public async Task DeleteSubject(int id)
    {
        var subject = await _repo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.Exams)
                .ThenInclude(s => s.SkillResults)
            .Include(s => s.Exams)
                .ThenInclude(s => s.Results)
            .Include(s => s.Results)
            .Include(s => s.SpecificObjectives)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Subject not found!");

        subject.IsActive = false;

        foreach (var exam in subject.Exams)
        {
            exam.IsActive = false;

            foreach (var result in exam.SkillResults)
                result.IsActive = false;

            foreach (var result in exam.Results)
                result.IsActive = false;
        }

        foreach (var result in subject.Results)
            result.IsActive = false;

        foreach (var objective in subject.SpecificObjectives)
            objective.IsActive = false;

        _repo.Update(subject);
        await _repo.SaveAsync();
    }

    #endregion

    #region Pages

    public async Task<AppResponse<InstructorSubjectDTO>> GetInstructorPage(int id)
    {
        var subject = await _repo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.Instructor)
            .Include(s => s.CurricularUnit)
            .Include(s => s.Class.Students).ThenInclude(s => s.User)
            .Include(s => s.Exams.Where(e => e.IsActive))
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Subject not found!");
            
        subject.Class.Students = [ ..subject.Class.Students.Where(s => !s.User.IsArchived && s.User.IsActive) ];
        
        var feedbacks = await _studentRepo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Class.Id == subject.Class.Id)
            .Include(s => s.Feedbacks)
            .ThenInclude(f => f.Instructor)
            .Include(s => s.User)
            .Select(s => SubjectFeedbackDTO.Map(s.Feedbacks.SingleOrDefault(f => f.Subject!.Id == id), s))
            .ToListAsync();

        var results = subject.Exams
            .Select(
                e => ExamResultsDTO.Map(
                    e, _examService.GetExamSkills(e.Id),
                    subject.Class.Students.Select(s =>
                        _studentService.GetExamResults(s.Id, e.Id)).OrderBy(s => s.Name)));
        return new AppResponse<InstructorSubjectDTO>(
            InstructorSubjectDTO.Map(subject, results, feedbacks),
            "Subject info found!"
        );
    }

    #endregion
}
