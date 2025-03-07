using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IOccupationAreaService : IService<OccupationArea>
{
    public Task<AppResponse<OccupationArea>> GetOccupationAreaById(int id);
    public Task<AppResponse<UpdateOccupationAreaPayload>> UpdateOccupationArea(int id, UpdateOccupationAreaPayload data);
    public Task DeleteOccupationArea(int id);
    public PaginatedAppResponse<UpdateOccupationAreaPayload> GetPaginated(PaginationQuery pagination, string? query = null, int? id = null);
}
