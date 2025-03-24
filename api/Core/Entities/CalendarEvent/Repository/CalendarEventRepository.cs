using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class CalendarEventRepository(SkillhubContext context) 
    : BaseRepository<CalendarEvent>(context), ICalendarEventRepository
{

}
