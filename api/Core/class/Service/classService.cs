using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Core.Services;

public class ClassService(BaseRepository<Class> repository)
    : BaseService<Class> (repository), IClassService
{

}
