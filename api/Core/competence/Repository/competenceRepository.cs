using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class CompetenceRepository(Project_eContext context) 
    : BaseRepository<Competence>(context), ICompetenceRepository
{

}
