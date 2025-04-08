

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
    BaseRepository<ClassEvent> repository
) : BaseService<ClassEvent>(repository), IClassEventService
{
    private readonly BaseRepository<ClassEvent> _repo = repository;

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
            .Select(_data => SubjectEventDetails.Map(_data))
            .ToListAsync();


        return new AppResponse<IEnumerable<SubjectEventDetails>>(
            subjectsEventDetails,
            ""
        );
    }


    #endregion
}