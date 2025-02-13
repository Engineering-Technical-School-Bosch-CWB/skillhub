using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IOccupationAreaService : IService<OccupationArea>
{
    public Task<AppResponse<OccupationArea>> GetOccupationAreaById(int id);
    public Task<AppResponse<UpdateOcupationAreaPayload>> UpdateOccupationArea(int id, UpdateOcupationAreaPayload data);
    public Task DeleteOccupationArea(int id);
    public PaginatedAppResponse<UpdateOcupationAreaPayload> GetPaginated(PaginationQuery pagination, string? query);
}
