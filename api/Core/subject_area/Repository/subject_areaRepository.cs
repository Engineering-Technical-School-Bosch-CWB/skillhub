using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class SubjectAreaRepository(Project_eContext context) 
    : BaseRepository<SubjectArea>(context), ISubjectAreaRepository
{

}
