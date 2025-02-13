using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class SubjectService(BaseRepository<Subject> repository, IUserRepository userRepository, IStudentService studentService, IFeedbackRepository feedbackRepository,
    ICurricularUnitRepository curricularUnitRepository, IClassRepository classRepository, IExamService examService, IStudentRepository studentRepository, IPaginationService paginationService
    ) : BaseService<Subject>(repository), ISubjectService
{
    private readonly BaseRepository<Subject> _repo = repository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly ICurricularUnitRepository _curricularUnitRepo = curricularUnitRepository;
    private readonly IUserRepository _userRepo = userRepository;
    private readonly IStudentRepository _studentRepo = studentRepository;
    private readonly IPaginationService _pagService = paginationService;
    private readonly IFeedbackRepository _feedbackRepo = feedbackRepository;

    private readonly IExamService _examService = examService;
    private readonly IStudentService _studentService = studentService;

    #region CRUD

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
            var hasFeedback  = await _feedbackRepo.Get()
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

    #endregion

    #region Pages

    public async Task<AppResponse<InstructorSubjectDTO>> GetInstructorPage(int id)
    {
        var subject = await _repo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.CurricularUnit)
            .Include(s => s.Class.Students)
            .Include(s => s.Exams.Where(e => e.IsActive))
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Subject not found!");

        var feedbacks = await _studentRepo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Class.Id == subject.Class.Id)
            .Include(s => s.Feedbacks)
            .ThenInclude(f => f.Instructor)
            .Include(s => s.User)
            .Select(s => SubjectFeedbackDTO.Map(s.Feedbacks.SingleOrDefault(f => f.Subject!.Id == id), s))
            .ToListAsync();

        var results = subject.Exams.Select(e => ExamResultsDTO.Map(e, _examService.GetExamSkills(e.Id), subject.Class.Students.Select(s => _studentService.GetExamResults(s.Id, e.Id))));

        return new AppResponse<InstructorSubjectDTO>(
            InstructorSubjectDTO.Map(subject, results, feedbacks),
            "Subject info found!"
        );
    }


    #endregion
}
