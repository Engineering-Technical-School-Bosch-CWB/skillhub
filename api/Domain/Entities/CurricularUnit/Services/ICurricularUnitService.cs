using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface ICurricularUnitService : IService<CurricularUnit>
{
    public Task<AppResponse<CurricularUnitDTO>> CreateCurricularUnit(CurricularUnitCreatePayload payload);
    public Task<AppResponse<CurricularUnitDTO>> UpdateCurricularUnit(int id, CurricularUnitUpdatePayload payload);
    public Task DeleteCurricularUnit(int id);
    public Task<AppResponse<CurricularUnitDTO>> GetCurricularUnit(int id);
    public Task<PaginatedAppResponse<CurricularUnitDTO>> GetPaginatedCurricularUnits(PaginationQuery pagination, string? query, int? subjectAreaId);
}
