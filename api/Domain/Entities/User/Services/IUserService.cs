using Genesis.Domain.Services;
using Api.Domain.Models;
using Api.Core.Services;

namespace Api.Domain.Services;

public interface IUserService : IService<User>
{
    public Task<AppResponse<UserDTO>> CreateUser(UserCreatePayload payload);
    public Task<AppResponse<UserDTO>> CreateUserByClass(UserCreatePayload payload, int idClass);
    public Task<AppResponse<UserDTO>> UpdateUser(int id, UserUpdatePayload payload, UserContext userContext);
    public Task ArchiveUser(int id);
    public Task DeleteUser(int id);
    public Task<AppResponse<UserDTO>> GetUser(int id);
    public Task<IEnumerable<ObjectDTO>> GetTeachers(User? instructor = null);
    public Task<PaginatedAppResponse<UserBirthdayDTO>> GetBirthdays(PaginationQuery pagination, short month);
    public Task<PaginatedAppResponse<UserDTO>> GetPaginatedUsers(PaginationQuery pagination, string? query, short? birthmonth, int? positionId, int? classId);
    public Task<AppResponse<UserProfileDTO>> GetUserProfile(int? id, int loggedId);
}
