using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class SubjectAreaRepository(Project_eContext context) 
    : BaseRepository<SubjectArea>(context), ISubjectAreaRepository
{

}
