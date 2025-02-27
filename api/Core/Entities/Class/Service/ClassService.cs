using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;
using Api.Core.Repositories;
using Microsoft.AspNetCore.Identity;
using System.Net.WebSockets;

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
            .SingleOrDefaultAsync(c => c.Id == payload.Course.Id)
            ?? throw new NotFoundException("Course not found!");

        var __curricularUnitIds = payload.Subjects.Select(cu => cu.CurricularUnitId).ToList();
        List<CurricularUnit> _curricularUnits = [];
        if (__curricularUnitIds.Count > 0)
            _curricularUnits = await _curricularUnitRepository.Get()
                .Where(c => c.IsActive && __curricularUnitIds.Contains(c.Id))
                .ToListAsync();


        var _sector = await _sectorRepo.Get().SingleOrDefaultAsync(s => s.Name == "ETS")
            ?? throw new Exception("Not found sector ETS");
        var _position = await _positionRepo.Get().SingleOrDefaultAsync(p => p.PermissionLevel == 1)
            ?? throw new Exception("Not found user with ");

        var createdClass = _repo.Add(new Class
        {
            Name = payload.Class.Name,
            Course = course,
            StartingYear = (short)new DateOnly().Year,
            DurationPeriods = payload.Class.Period
        }) ?? throw new UpsertFailException("Class could not be inserted!");

        await _repo.SaveAsync();

        List<User> insertedUsers = payload.Students.Select(s => 
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

            var inserted = _userRepo.Add(__user);
            return inserted;
        }).ToList();
        await _userRepo.SaveAsync();

        List<Subject> _subjects = _curricularUnits.Select(cu =>
        {
            Subject s = new()
            {
                Class = createdClass,
                CurricularUnit = cu,
                DurationHours = payload.Subjects.FirstOrDefault(s => s.CurricularUnitId == cu.Id).Duration,
                Period = payload.Class.Period,
                IsActive = true,
                BeganAt = null,
                Instructor = null
            };
            var added = _subjectRepo.Add(s);


            return added; 
        }).ToList();
        await _subjectRepo.SaveAsync();

        List<Student> _students =  insertedUsers.Select(u =>
        {   

            var inserted = _studentRepo.Add(new()
            {
                Class = createdClass,
                User = u,
            });

            return inserted;
        }).ToList();
        await _studentRepo.SaveAsync();

        createdClass.Subjects = _subjects;
        createdClass.Students = _students;

        return new AppResponse<ClassDTO>(
            ClassDTO.Map(createdClass),
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
    {
        var _class = await _repo.Get()
            .Where(c => c.IsActive && !c.IsArchived)
            .Include(c => c.Students)
                .ThenInclude(s => s.User)
            .SingleOrDefaultAsync(c => c.Id == id)
            ?? throw new NotFoundException("Class not found!");

        _class.IsArchived = true;

        foreach (var student in _class.Students)
            student.User.IsArchived = true;

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
