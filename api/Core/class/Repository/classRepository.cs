using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class ClassRepository(Project_eContext context) 
    : BaseRepository<Class>(context), IClassRepository
{

}
