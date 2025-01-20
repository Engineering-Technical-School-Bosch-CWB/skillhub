using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class SubjectRepository(SkillhubContext context) 
    : BaseRepository<Subject>(context), ISubjectRepository
{

}
