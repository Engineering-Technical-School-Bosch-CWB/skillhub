using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IClassService : IService<Class>
{
    public Task<AppResponse<ClassDTO>> CreateClass(ClassCreatePayload payload);
}
