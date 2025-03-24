using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class ClassEventRepository(SkillhubContext context) 
    : BaseRepository<ClassEvent>(context), IClassEventRepository
{

}
