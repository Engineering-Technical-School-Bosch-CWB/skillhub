using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class ClassService(
    BaseRepository<Class> repository, IStudentService studentService, IStudentRepository studentRepository,
    ICourseRepository courseRepository, ISubjectRepository subjectRepository
) : BaseService<Class>(repository), IClassService
{

    private readonly BaseRepository<Class> _repo = repository;
    private readonly ICourseRepository _courseRepo = courseRepository;
    private readonly IStudentRepository _studentRepo = studentRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;

    private readonly IStudentService _studentService = studentService;

    public async Task<AppResponse<ClassDTO>> CreateClass(ClassCreatePayload payload)
    {
        var course = await _courseRepo.Get()
            .SingleOrDefaultAsync(c => c.Id == payload.CourseId)
            ?? throw new NotFoundException("Course not found!");

        var newClass = new Class
        {
            Name = payload.Name,
            Course = course,
            StartingYear = payload.StartingYear,
            DurationPeriods = payload.DurationPeriods
        };

        var class_ = _repo.Add(newClass)
            ?? throw new UpsertFailException("Class could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<ClassDTO>(
            ClassDTO.Map(class_),
            "Class created successfully!"
        );
    }

    public async Task<AppResponse<ClassPageDTO>> GetClassPage(int id, int? subjectAreaId, int? selectedStudentId, int? selectedCurricularUnitId, int? selectedSubjectAreaId)
    {
        var class_ = await _repo.Get()
            .Where(c => c.IsActive)
            .Include(c => c.Course)
            .Include(c => c.Subjects).ThenInclude(s => s.CurricularUnit.SubjectArea)
            .Include(c => c.Subjects).ThenInclude(s => s.Instructor)
            .Include(c => c.Students).ThenInclude(s => s.User)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Class not found!");

        var subjects = class_.Subjects
            .Where(s => s.IsActive)
            .Where(s => !subjectAreaId.HasValue || s.CurricularUnit.SubjectArea.Id == subjectAreaId)
            .Select(s => SubjectResultDTO.Map(s));

        var students = class_.Students
            .Where(s => s.IsActive)
            .Select(s => SimpleStudentDTO.Map(s));

        var selectedSubjects = await _subjectRepo.Get()
            .Where(s => s.Class.Id == id)
            .Where(s => !selectedCurricularUnitId.HasValue || s.CurricularUnit.Id == selectedCurricularUnitId.Value)
            .Where(s => !selectedSubjectAreaId.HasValue || s.CurricularUnit.SubjectArea.Id == selectedSubjectAreaId.Value)
            .ToListAsync();

        var selectedStudents = await _studentRepo.Get()
            .Where(s => s.Class.Id == id)
            .Where(s => !selectedStudentId.HasValue || s.Id == selectedStudentId)
            .ToListAsync();

        return new AppResponse<ClassPageDTO>(
            ClassPageDTO.Map(class_, subjects, GetClassGraphs(selectedSubjects, selectedStudents)),
            "Class info found!"
        );
    }

    public ClassGraphsDTO GetClassGraphs(IEnumerable<Subject> subjects, IEnumerable<Student> students)
    {

        var results = subjects.SelectMany(subj => students.Select(student => {

                var performance = _studentService.GetSubjectGrade(student.Id, subj.Id);
                return new
                {
                    Subject = subj,
                    Student = student,
                    Performance = performance
                };
            })
        );

        var subjectResults = results.GroupBy(r => r.Subject).Select(g => SubjectResultDTO.Map(g.Key, g.Average(a => a.Performance)));
        var studentResults = results.GroupBy(r => r.Student).Select(g => SimpleStudentDTO.Map(g.Key, g.Average(a => a.Performance)));
        var subjectAreaResults = results.GroupBy(r => r.Subject.CurricularUnit.SubjectArea).Select(g => SubjectAreaDTO.Map(g.Key, g.Average(a => a.Performance)));

        return new ClassGraphsDTO(
            subjectResults.Any() ? subjectResults.Average(s => s.Performance) : null,
            subjectResults,
            studentResults,
            subjectAreaResults
        );
    }

}
