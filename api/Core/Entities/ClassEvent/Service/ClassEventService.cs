

using System.IO.Pipes;
using System.Threading.Tasks;
using Api.Core.Errors;
using Api.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;
using Microsoft.EntityFrameworkCore;

public class ClassEventService
(
    BaseRepository<ClassEvent> repository,
    ISubjectRepository subjectRepository,
    IEventRepository eventRepository,
    IClassRepository classRepository
) : BaseService<ClassEvent>(repository), IClassEventService
{
    private readonly BaseRepository<ClassEvent> _repo = repository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly IEventRepository _eventRepo = eventRepository;

    #region CRUD
    public async Task<AppResponse<ClassEventDTO>> CreateClassEvent(ClassEventPayload payload)
    {
        var savedClassEvent = new ClassEvent()
        {
            Subject = await _subjectRepo.Get()
                .Where(_subject => _subject.IsActive)
                .FirstOrDefaultAsync(_subject => _subject.Id == payload.SubjectId) 
                ?? throw new NotFoundException("Subject not founded"),
            Class = await _classRepo.Get()
                .Where(_class => _class.IsActive)
                .FirstOrDefaultAsync(_class => _class.Id == payload.ClassId) 
                ?? throw new NotFoundException("Class not founded"),
            Event = await _eventRepo.Get()
                .Where(_event => _event.IsActive)
                .FirstOrDefaultAsync(_event => _event.Id == payload.EventId) 
                ?? throw new NotFoundException("Event not founded")
        };
        _repo.Add(savedClassEvent);
        await _repo.SaveAsync();

        return new AppResponse<ClassEventDTO>(
            ClassEventDTO.Map(savedClassEvent),
            "ClassEvent created successfully!"
        );
    }

    public async Task DeleteClassEvent(int id)
    {
        var classEvent = await _repo.Get()
            .SingleOrDefaultAsync(_classEvent => _classEvent.Id == id && _classEvent.IsActive)
            ?? throw new NotFoundException("ClassEvent not founded");

        classEvent.IsActive = false;

        _ = _repo.Update(classEvent) ?? throw new DeleteFailException("ClassEvent could not be deleted!");
        await _repo.SaveAsync();
    }
    #endregion

    #region Services
    public async Task<IEnumerable<ClassEventDTO>> GetAllByClassIdAsync(int year, int month, int id)
    {
        DateTime startDate = new DateTime(year, month, 1);
        int m = month + 1;
        int y = year;
        if(m > 12)
        {
            m = 1;
            y += 1;
        }
        DateTime endDate = new DateTime(y, m, 1).AddDays(-1);
        startDate.AddDays(-1 * (int)startDate.DayOfWeek);
        endDate.AddDays((int)(DayOfWeek.Saturday - endDate.DayOfWeek));

        var query = await _repo.Get()
            .Where(_classEvent => _classEvent.IsActive)
            .Where(_classEvent => _classEvent.Event.StartDate >= startDate && _classEvent.Event.StartDate <= endDate)
            .Where(_classEvent => _classEvent.Class != null && _classEvent.Class.Id == id)
            .OrderBy(_classEvent => _classEvent.Id)
            .ToListAsync();
        
        var events = query
            .Select(_classEvent => ClassEventDTO.Map(_classEvent));

        return events;
    }

    public async Task<IEnumerable<SubjectEventDetails>> GetSubjectsEventsDetailsByClass(int id)
    {
        var subjectsEventDetails = await _subjectRepo.Get()
            .Include(_subject => _subject.CurricularUnit)
            .Include(_subject => _subject.Instructor)
            .Include(_subject => _subject.ClassEvents)
            .Where(_subject => _subject.IsActive && _subject.Class.Id == id)
            .Select(_subject => SubjectEventDetails.Map(_subject))
            .ToListAsync();

        return subjectsEventDetails;
    }

    public async Task<AppResponse<CalendarClassPageDTO>> GetClassPage(int year, int month, int id)
    {
        var subjects = await GetSubjectsEventsDetailsByClass(id);
        var events = await GetAllByClassIdAsync(year, month, id);
        return new AppResponse<CalendarClassPageDTO>(
            CalendarClassPageDTO.Map(subjects, events),
            "Calendar student page data founded!"
        );
    }


    #endregion
}