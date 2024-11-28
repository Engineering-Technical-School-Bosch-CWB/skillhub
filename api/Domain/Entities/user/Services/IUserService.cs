using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IUserService : IService<User>
{
    public Task<AppResponse<UserDTO>> CreateUser(UserCreatePayload payload);
    public Task<AppResponse<UserDTO>> UpdateUser(int id, UserUpdatePayload payload);
    public Task DeleteUser(int id);
    public Task<AppResponse<UserDTO>> Get(int id);
    public Task<PaginatedAppResponse<UserDTO>> GetPaginated(PaginationQuery pagination, string? query, short? birthmonth, int? positionId, int? classId);
}