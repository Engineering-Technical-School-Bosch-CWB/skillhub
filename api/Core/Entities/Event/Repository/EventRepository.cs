using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class EventRepository(SkillhubContext context) 
    : BaseRepository<Event>(context), IEventRepository
{

}
