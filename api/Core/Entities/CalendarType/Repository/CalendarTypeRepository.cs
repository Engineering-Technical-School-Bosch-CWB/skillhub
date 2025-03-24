using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class CalendarTypeRepository(SkillhubContext context) 
    : BaseRepository<CalendarType>(context), ICalendarTypeRepository
{

}
