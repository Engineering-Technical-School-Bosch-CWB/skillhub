using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class EventMemberRepository(SkillhubContext context) 
    : BaseRepository<EventMember>(context), IEventMemberRepository
{

}
