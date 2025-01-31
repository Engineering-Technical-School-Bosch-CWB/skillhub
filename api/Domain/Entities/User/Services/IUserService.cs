using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IUserService : IService<User>
{
    public Task<AppResponse<UserDTO>> CreateUser(UserCreatePayload payload);
    public Task<AppResponse<UserDTO>> UpdateUser(int id, UserUpdatePayload payload);
    public Task DeleteUser(int id);
    public Task<AppResponse<UserDTO>> GetUser(int id);
    public Task<PaginatedAppResponse<UserDTO>> GetPaginatedUsers(PaginationQuery pagination, string? query, short? birthmonth, int? positionId, int? classId);
    public Task<AppResponse<UserProfileDTO>> GetUserProfile(int? id, int loggedId);
}
