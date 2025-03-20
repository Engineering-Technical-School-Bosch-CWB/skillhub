using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IObjectionService : IService<Objection>
{
    public Task<AppResponse<ObjectionDTO>> CreateObjection(ObjectionPayload payload);
}
