using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class SubjectRepository(Project_eContext context) 
    : BaseRepository<Subject>(context), ISubjectRepository
{

}
