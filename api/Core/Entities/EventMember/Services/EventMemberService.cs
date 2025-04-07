using Api.Core.Errors;
using Api.Domain.Enums;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Genesis.Core.Repositories;
using Genesis.Core.Services;
using Microsoft.EntityFrameworkCore;

public class EventMemberService(BaseRepository<EventMember> repository, IUserRepository userRepository) : BaseService<EventMember>(repository), IEventMemberService
{
    private readonly BaseRepository<EventMember> _repo = repository;
    private readonly IUserRepository _userRepo = userRepository;

    public Task<AppResponse<IEnumerable<FullEventMemberDTO>>> GetTeacherEvents(int year, int month, int? occupationAreaId)
    {
        var teachers = _userRepo.Get()
        .Where(u => (EPositionType)u.Position.PositionType == EPositionType.Teacher)
        .Where(u => occupationAreaId == null || u.OccupationArea.Id == occupationAreaId)
        .Select(u => new {u.Id, u.Name});

        throw new NotImplementedException();
    }
}