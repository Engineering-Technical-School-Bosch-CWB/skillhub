using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors;
using Api.Domain.Repositories;
using Api.Core.Repositories;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Api.Core.Services;

public class CurricularUnitService : BaseService<CurricularUnit>, ICurricularUnitService
{
    ICurricularUnitRepository _curricularUnitRepository;
    ISubjectAreaRepository _subjectAreaRepository;

    public CurricularUnitService(
        BaseRepository<CurricularUnit> repository,
        ICurricularUnitRepository curricularUnitRepository,
        ISubjectAreaRepository subjectAreaRepository)
        : base(repository)
    {
        _curricularUnitRepository = curricularUnitRepository;
        _subjectAreaRepository = subjectAreaRepository;
    }
    public AppResponse<CurricularUnitDTO> CreateCurricularUnit(CreateCurricularUnitPayload payload)
    {
        var name = repository.Get()
            .FirstOrDefault(cu => cu.Name == payload.Name);
        
        if(name is not null)
            throw new AlreadyExistsException("There is already a curricular unit named as such.");

        var subjectArea = _subjectAreaRepository.Get()
            .FirstOrDefault(sa => sa.Id == payload.SubjectAreaId);

        if(subjectArea is null)
            throw new NotFoundException("Subject area not found.");

        var curricularUnit = new CurricularUnit(
            payload.Name,
            subjectArea
        );
    }

    public AppResponse<CurricularUnitDTO> UpdateCurricularUnit(UpdateCurricularUnitPayload payload)
    {
        throw new NotImplementedException();
    }
}
