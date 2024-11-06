using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class ResultRepository(Project_eContext context) 
    : BaseRepository<Result>(context), IResultRepository
{

}
