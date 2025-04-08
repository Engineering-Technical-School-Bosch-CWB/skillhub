using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IEventMemberService : IService<EventMember>
{
    public Task<AppResponse<IEnumerable<FullEventMemberDTO>>> GetTeacherEvents(int year, int month, int? occupationAreaId);
}
