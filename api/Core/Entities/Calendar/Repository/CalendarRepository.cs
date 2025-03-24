using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class CalendarRepository(SkillhubContext context) 
    : BaseRepository<Calendar>(context), ICalendarRepository
{

}
