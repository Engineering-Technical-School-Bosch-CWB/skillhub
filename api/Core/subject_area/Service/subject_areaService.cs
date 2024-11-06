using Genesis.Core.Services;
using Genesis.Core.Repositories;
using api.Domain.Models;
using api.Domain.Services;

namespace api.Core.Services;

public class SubjectAreaService(BaseRepository<SubjectArea> repository)
    : BaseService<SubjectArea> (repository), ISubjectAreaService
{

}
