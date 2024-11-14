using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IUserService : IService<User>
{
    public Task<UserCreatedOutbound> CreateUser(UserCreatePayload payload);
    public Task<UserUpdatedOutbound> UpdateUser(int id, UserUpdatePayload payload);
    public Task DeleteUser(int id);
}