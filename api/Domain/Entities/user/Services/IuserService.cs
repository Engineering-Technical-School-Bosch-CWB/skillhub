using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IUserService : IService<User>
{
    public Task<UserResponses> CreateUser(UserCreatePayload payload);
    public Task<UserResponses> UpdateUser(int id, UserUpdatePayload payload);
    public Task DeleteUser(int id);
}
