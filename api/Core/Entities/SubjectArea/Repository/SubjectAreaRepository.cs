using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class SubjectAreaRepository(SkillhubContext context) 
    : BaseRepository<SubjectArea>(context), ISubjectAreaRepository
{

}
