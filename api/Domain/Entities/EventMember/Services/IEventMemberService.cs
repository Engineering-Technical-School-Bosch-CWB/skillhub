using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IEventMemberService : IService<EventMember>
{
    public Task<AppResponse<EventMemberDTO>> CreateEventMember(EventMemberCreatePayload payload);
    public Task DeleteEventMember(int id);
    public Task<AppResponse<EventMemberDTO>> GetEventMemberById(int id);
    public Task<AppResponse<EventMemberDTO>> UpdateEventMember(int id, EventMemberUpdatePayload payload);
    public Task<AppResponse<IEnumerable<FullEventMemberDTO>>> GetTeacherEvents(int year, int month, int? occupationAreaId);
}
