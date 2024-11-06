using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class SubjectRepository(Project_eContext context) 
    : BaseRepository<Subject>(context), ISubjectRepository
{

}
