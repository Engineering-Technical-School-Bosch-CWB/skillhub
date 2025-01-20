using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class SubjectService(BaseRepository<Subject> repository, IUserRepository userRepository, IStudentService studentService,
    ICurricularUnitRepository curricularUnitRepository, IClassRepository classRepository, IExamService examService
    ) : BaseService<Subject>(repository), ISubjectService
{
    private readonly BaseRepository<Subject> _repo = repository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly ICurricularUnitRepository _curricularUnitRepo = curricularUnitRepository;
    private readonly IUserRepository _userRepo = userRepository;

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

        var aaa = subject.Exams.Select(e => ExamResultsDTO.Map(e, subject.Class.Students.Select(s => _studentService.GetExamResults(s.Id, e.Id))));

        return new AppResponse<InstructorSubjectDTO>(
            InstructorSubjectDTO.Map(subject, aaa),
            "Subject info found!"
        );
    }

    #endregion
}
