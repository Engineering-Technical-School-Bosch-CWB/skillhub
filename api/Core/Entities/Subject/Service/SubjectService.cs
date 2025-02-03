using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class SubjectService(BaseRepository<Subject> repository, IUserRepository userRepository, IStudentService studentService,
    ICurricularUnitRepository curricularUnitRepository, IClassRepository classRepository, IExamService examService, IStudentRepository studentRepository, IPaginationService paginationService
    ) : BaseService<Subject>(repository), ISubjectService
{
    private readonly BaseRepository<Subject> _repo = repository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly ICurricularUnitRepository _curricularUnitRepo = curricularUnitRepository;
    private readonly IUserRepository _userRepo = userRepository;
    private readonly IStudentRepository _studentRepo = studentRepository;
    private readonly IPaginationService _pageService = paginationService;

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


    public async Task<PaginatedAppResponse<SubjectDTO>> GetSubjectPaginated(PaginationQuery pagination, string? query = null)
    {
        var entities = _repo.GetAllNoTracking()
            .Include(subject => subject.CurricularUnit)
            .Where(subject => subject.IsActive)
            .Where(subject => string.IsNullOrEmpty(query) || EF.Functions.Like(subject.CurricularUnit.Name, $"%{query}%"));

        var result = await _pageService.PaginateAsync(
            _repo.GetAllNoTracking()
                .Include(subject => subject.CurricularUnit)
                .Where(subject => subject.IsActive)
                .Where(subject => string.IsNullOrEmpty(query) || EF.Functions.Like(subject.CurricularUnit.Name, $"%{query}%")),
            pagination.ToOptions()
        );

        List<SubjectDTO> resultList = result.Item1.Select(subject => SubjectDTO.Map(subject)).ToList();

        return new PaginatedAppResponse<SubjectDTO>(
            resultList,
            result.Item2,
            ""
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
            .Include(s => s.Exams)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Subject not found!");

        var feedbacks = await _studentRepo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Class.Id == subject.Class.Id)
            .Include(s => s.Feedbacks)
            .ThenInclude(f => f.Instructor)
            .Include(s => s.User)
            .Select(s => SimpleFeedbackDTO.Map(s.Feedbacks.SingleOrDefault(f => f.Subject!.Id == id), s))
            .ToListAsync();

        var results = subject.Exams.Select(e => ExamResultsDTO.Map(e, _examService.GetExamSkills(e.Id), subject.Class.Students.Select(s => _studentService.GetExamResults(s.Id, e.Id))));

        return new AppResponse<InstructorSubjectDTO>(
            InstructorSubjectDTO.Map(subject, results, feedbacks),
            "Subject info found!"
        );
    }


    #endregion
}
