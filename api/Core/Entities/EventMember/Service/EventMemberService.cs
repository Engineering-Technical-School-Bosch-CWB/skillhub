using Api.Core.Errors;
using Api.Domain.Enums;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;
using Microsoft.EntityFrameworkCore;

public class EventMemberService(
    BaseRepository<EventMember> repository, IUserRepository userRepository, IEventRepository eventRepository
) : BaseService<EventMember>(repository), IEventMemberService
{
    private readonly BaseRepository<EventMember> _repo = repository;
    private readonly IUserRepository _userRepo = userRepository;
    private readonly IEventRepository _eventRepo = eventRepository;

    public async Task<AppResponse<IEnumerable<FullEventMemberDTO>>> GetTeacherEvents(int year, int month, int? occupationAreaId)
    {
        var teachers = await _userRepo.Get()
            .Where(user => (EPositionType)user.Position.PositionType == EPositionType.Teacher)
            .Where(user => occupationAreaId == null || user.OccupationArea.Id == occupationAreaId)
            .ToListAsync();

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

        var data = teachers.Select(async teacher =>
        {
            var events = await _eventRepo.Get()
                .Where(_event => _event.Start_date >= startDate && _event.Start_date <= endDate)
                .Include(_event => _event.ClassEvents)
                    .ThenInclude(classEvents => classEvents.Subject)
                .Include(_event => _event.ClassEvents)
                    .ThenInclude(classEvents => classEvents.Class)
                .Include(_event => _event.EventMembers)
                    .ThenInclude(eventMembers => eventMembers.Member)
                .Include(_event => _event.EventType)
                .Where(_event => _event.EventMembers.Any(eventMember => eventMember.Member.Id == teacher.Id))
                .ToListAsync();

            return FullEventMemberDTO.Map(teacher, events);
        });

        return new AppResponse<IEnumerable<FullEventMemberDTO>>(await Task.WhenAll(data), "Events found.");
    }
}