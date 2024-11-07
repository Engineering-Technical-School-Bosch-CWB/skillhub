using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class ResultRepository(Project_eContext context) 
    : BaseRepository<Result>(context), IResultRepository
{

}
