using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;
using Api.Core.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Api.Core.Services;

public class ClassService(
    BaseRepository<Class> repository, IStudentService studentService, IStudentRepository studentRepository,
    ICourseRepository courseRepository, ISubjectRepository subjectRepository,
    IPositionRepository positionRepo,
    ISectorRepository sectorRepo,
    IOccupationAreaRepository occupationAreaRepo,
    PasswordHasher<User> passwordHasher

) : BaseService<Class>(repository), IClassService
{

    private readonly BaseRepository<Class> _repo = repository;
    private readonly ICourseRepository _courseRepo = courseRepository;
    private readonly IStudentRepository _studentRepo = studentRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;

    private readonly IPositionRepository _positionRepo = positionRepo;
    private readonly ISectorRepository _sectorRepo = sectorRepo;
    private readonly IOccupationAreaRepository _occupationAreaRepo = occupationAreaRepo;
    private readonly PasswordHasher<User> _passwordHasher = passwordHasher;


    private readonly IStudentService _studentService = studentService;

    #region CRUD

    public async Task<AppResponse<IEnumerable<ClassDTO>>> GetClasses(string? query)
    {
        var classes = await _repo.Get()
            .Where(c => c.IsActive)
            .Where(c => string.IsNullOrEmpty(query) || c.Name.Contains(query))
            .Include(c => c.Course)
            .Select(c => ClassDTO.Map(c))
            .ToListAsync();

        return new AppResponse<IEnumerable<ClassDTO>>(
            classes,
            "Classes found!"
        );
    }

    public async Task<AppResponse<ClassDTO>> CreateClass(ClassCreatePayload payload)
    {
        var course = await _courseRepo.Get()
            .Include(c => c.DefaultOccupationArea)
            .SingleOrDefaultAsync(c => c.Id == payload.Course.Id)
            ?? throw new NotFoundException("Course not found!");


        var _sector = await _sectorRepo.GetAllNoTracking().SingleOrDefaultAsync(s => s.Name == "ETS")
            ?? throw new Exception("Not found sector ETS");
        var _position = await _positionRepo.GetAllNoTracking().SingleOrDefaultAsync( p => p.PositionLevel == 1)
            ?? throw new Exception("Not found user with ");
        

        List<User> users = payload.Students.Select(s =>
        {
            User __user = new()
            {
                Sector = _sector,
                Position = _position,
                OccupationArea = course.DefaultOccupationArea,
                Name = s.Name,
                Identification = s.Identification,
                Hash = "",
                IsActive = true
            };
            __user.Hash = _passwordHasher.HashPassword(__user, s.Identification);

            return __user;
        }).ToList();


        var newClass = new Class
        {
            Name = payload.Class.Name,
            Course = course,
            StartingYear = (short)new DateOnly().Year,
            DurationPeriods = payload.Class.Period
        };

        var class_ = _repo.Add(newClass)
            ?? throw new UpsertFailException("Class could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<ClassDTO>(
            ClassDTO.Map(class_),
            "Class created successfully!"
        );
    }

    #endregion

    #region Services

    public ClassGraphsDTO GetClassGraphs(IEnumerable<Subject> subjects, IEnumerable<Student> students)
    {
        var results = subjects.SelectMany(subj => students.Select(student => new
            {
                Subject = subj,
                Student = student,
                Performance = _studentService.GetSubjectGrade(student.Id, subj.Id)
            }
        ));

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

    #endregion

    #region Pages

    public async Task<AppResponse<ClassPageDTO>> GetClassPage(int id, string? query, int? selectedStudentId, int? selectedCurricularUnitId, int? selectedSubjectAreaId)
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
            .Where(s => string.IsNullOrEmpty(query) || s.CurricularUnit.Name.Contains(query, StringComparison.OrdinalIgnoreCase))
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
            ClassPageDTO.Map(class_, subjects, students, GetClassGraphs(selectedSubjects, selectedStudents)),
            "Class info found!"
        );
    }

    #endregion
}
