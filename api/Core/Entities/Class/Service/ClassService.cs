using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;
using Microsoft.AspNetCore.Identity;

namespace Api.Core.Services;

public class ClassService(
    BaseRepository<Class> repository, IStudentService studentService, IStudentRepository studentRepository,
    ICourseRepository courseRepository, ISubjectRepository subjectRepository, IPositionRepository positionRepo,
    ISectorRepository sectorRepo, ICurricularUnitRepository curricularUnitRepository, IUserRepository userRepository,
    PasswordHasher<User> passwordHasher
) : BaseService<Class>(repository), IClassService
{

    private readonly BaseRepository<Class> _repo = repository;
    private readonly ICourseRepository _courseRepo = courseRepository;
    private readonly IStudentRepository _studentRepo = studentRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;
    private readonly IUserRepository _userRepo = userRepository;
    private readonly ICurricularUnitRepository _curricularUnitRepository = curricularUnitRepository;
    private readonly IPositionRepository _positionRepo = positionRepo;
    private readonly ISectorRepository _sectorRepo = sectorRepo;
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
            .SingleOrDefaultAsync(c => c.Id == payload.CourseId)
            ?? throw new NotFoundException("Course not found!");

        var curricularUnitIds = payload.Subjects.ToDictionary(s => s.CurricularUnitId, s => s.Duration);
        var curricularUnitKeys = curricularUnitIds.Keys.ToHashSet();

        var curricularUnits = new List<(CurricularUnit CurricularUnit, int Duration)>();
        if (curricularUnitIds.Count > 0)
        {
            var queryResult = await _curricularUnitRepository.Get()
                .Where(c => c.IsActive && curricularUnitKeys.Contains(c.Id))
                .Select(c => new { CurricularUnit = c, Duration = curricularUnitIds[c.Id] })
                .ToListAsync();

            curricularUnits = [.. queryResult.Select(x => (x.CurricularUnit, x.Duration))];
        }

        var ets = new HashSet<string> { "ETS", "ENGINEERING TECH SCHOOL" };

        var sector = _sectorRepo.Get()
            .AsEnumerable()
            .SingleOrDefault(s => ets.Contains(s.Name.ToUpperInvariant()))
            ?? throw new NotFoundException("Not found sector ETS.");

        var position = await _positionRepo.Get()
            .SingleOrDefaultAsync(p => p.PositionType == 1)
            ?? throw new NotFoundException("Not found apprentice position.");

        var createdClass = _repo.Add(new Class
        {
            Name = payload.Class.Name,
            Course = course,
            StartingYear = payload.Class.StartingYear,
            DurationPeriods = payload.Class.DurationPeriods
        }) ?? throw new UpsertFailException("Class could not be inserted!");

        await _repo.SaveAsync();

        var insertedUsers = payload.Students.Select(s =>
        {
            var user = new User
            {
                Sector = sector,
                Position = position,
                OccupationArea = course.DefaultOccupationArea,
                Name = s.Name,
                Identification = s.Identification,
                Hash = ""
            };
            user.Hash = _passwordHasher.HashPassword(user, s.Identification);

            return _userRepo.Add(user);
        }).ToList();

        await _userRepo.SaveAsync();

        var subjects = curricularUnits.Select(uc =>
        {
            var subject = new Subject
            {
                Class = createdClass,
                CurricularUnit = uc.CurricularUnit,
                DurationHours = uc.Duration,
                Period = payload.Class.DurationPeriods,
                IsActive = true,
                BeganAt = null,
                Instructor = null
            };
            return _subjectRepo.Add(subject);
        }).ToList();

        await _subjectRepo.SaveAsync();

        var students = insertedUsers.Select(u =>
        {
            var student = new Student
            {
                Class = createdClass,
                User = u,
            };
            return _studentRepo.Add(student);
        }).ToList();

        await _studentRepo.SaveAsync();

        createdClass.Subjects = subjects;
        createdClass.Students = students;

        return new AppResponse<ClassDTO>(
            ClassDTO.Map(createdClass),
            "Class created successfully!"
        );
    }


    public async Task<AppResponse<SimpleClassDTO>> UpdateClass(int id, ClassUpdatePayload payload)
    {
        var _class = await _repo.Get()
            .Where(c => c.IsActive)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Class not found!");

        _class.Name = payload.Name ?? _class.Name;
        _class.Abbreviation = payload.Abbreviation ?? _class.Abbreviation;
        _class.DurationPeriods = payload.DurationPeriods ?? _class.DurationPeriods;
        _class.StartingYear = payload.StartingYear ?? _class.StartingYear;

        var updatedClass = _repo.Update(_class);
        await _repo.SaveAsync();

        return new AppResponse<SimpleClassDTO>(
            SimpleClassDTO.Map(updatedClass),
            "Class updated successfully!"
        );
    }

    public async Task DeleteClass(int id)
    {
        var _class = await _repo.Get()
            .Where(c => c.IsActive)
            .Include(c => c.Students)
                .ThenInclude(s => s.User)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Class not found!");

        _class.IsActive = false;

        foreach (var student in _class.Students)
        {
            student.IsActive = false;
            student.User.IsActive = false;
        }

        _repo.Update(_class);
        await _repo.SaveAsync();
    }

    #endregion

    #region Services

    public ClassGraphsDTO GetClassGraphs(IEnumerable<Subject> subjects, IEnumerable<Student> students)
    {
        var results = subjects.SelectMany(subj => students.Select(student => new
        {
            Subject = subj,
            Student = student,
            Performance = _studentService.GetSubjectGrade(student.Id, subj.Id).Item1
        }
        ));

        var subjectResults = results.GroupBy(r => r.Subject).Select(g => SubjectResultDTO.Map(g.Key, (g.Average(a => a.Performance), null)));
        var studentResults = results.GroupBy(r => r.Student).Select(g => SimpleStudentDTO.Map(g.Key, g.Average(a => a.Performance)));
        var subjectAreaResults = results.GroupBy(r => r.Subject.CurricularUnit.SubjectArea).Select(g => SubjectAreaDTO.Map(g.Key, (g.Average(a => a.Performance), null)));

        return new ClassGraphsDTO(
            subjectResults.Any() ? subjectResults.Average(s => s.Grade) : null,
            subjectResults,
            studentResults,
            subjectAreaResults
        );
    }

    public async Task ArchiveClass(int id)
        => await UpdateArchiveState(id, true);

    public async Task UnarchiveClass(int id)
        => await UpdateArchiveState(id, false);

    async Task UpdateArchiveState(int id, bool archive)
    {
        var _class = await _repo.Get()
            .Where(c => c.IsActive && c.IsArchived != archive)
            .Include(c => c.Students)
                .ThenInclude(s => s.User)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Class not found!");

        _class.IsArchived = archive;

        foreach (var student in _class.Students)
            student.User.IsArchived = archive;

        _repo.Update(_class);
        await _repo.SaveAsync();
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
            .Include(c => c.Students).ThenInclude(s => s.User.ProfilePicture)
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
            .Where(s => s.IsActive && s.Class.Id == id)
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
