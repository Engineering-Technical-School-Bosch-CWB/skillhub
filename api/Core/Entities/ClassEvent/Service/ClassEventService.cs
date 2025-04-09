

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
    public async Task<AppResponse<IEnumerable<ClassEventDTO>>> GetByClassId(int id)
    {
        var events = await _repo.Get()
            .Where(_event => _event.IsActive)
            .Where(_event => _event.Class != null && _event.Class.Id == id)
            .OrderBy(_classEvent => _classEvent.Id)
            .Select(_event => ClassEventDTO.Map(_event))
            .ToListAsync();

        return new AppResponse<IEnumerable<ClassEventDTO>>(
            events,
            "ClassEvent founded!"
        );
    }

    public async Task<AppResponse<IEnumerable<SubjectEventDetails>>> GetSubjectsEventsDetailsByClass(int id)
    {
        var subjectsEventDetails = await _repo.Get()
            .Where(_event => _event.Class.Id == id && _event.Subject != null)
            .GroupBy(_event => _event.Subject)
            .Select(_data => SubjectEventDetails.Map(_data!))
            .ToListAsync();


        return new AppResponse<IEnumerable<SubjectEventDetails>>(
            subjectsEventDetails,
            "Subjects Details founded"
        );
    }


    #endregion
}