using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ICurricularUnitService : IService<CurricularUnit>
{
    public AppResponse<CurricularUnitDTO> CreateCurricularUnit(CreateCurricularUnitPayload payload);
    public AppResponse<CurricularUnitDTO> UpdateCurricularUnit(UpdateCurricularUnitPayload payload);
}
