using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class SubjectService(BaseRepository<Subject> repository, IUserRepository userRepository,
    ICurricularUnitRepository curricularUnitRepository, IClassRepository classRepository, IExamService examService
    ) : BaseService<Subject>(repository), ISubjectService
{
    private readonly BaseRepository<Subject> _repo = repository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly ICurricularUnitRepository _curricularUnitRepo = curricularUnitRepository;
    private readonly IUserRepository _userRepo = userRepository;

    private readonly IExamService _examService = examService;

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


    public async Task<AppResponse<InstructorSubjectDTO>> GetInstructorPage(int id)
    {
        var subject = await _repo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.CurricularUnit)
            .Include(s => s.Class)
            .Include(s => s.Exams)
            .SingleOrDefaultAsync(s => s.Id == id)
            ?? throw new NotFoundException("Subject not found!");

        var examsResults = await Task.WhenAll(subject.Exams.Select(e => _examService.GetStudentsResults(e.Id)));

        return new AppResponse<InstructorSubjectDTO>(
            InstructorSubjectDTO.Map(subject, examsResults),
            "Subject info found!"
        );
    }
}
