using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class ClassRepository(Project_eContext context) 
    : BaseRepository<Class>(context), IClassRepository
{

}
