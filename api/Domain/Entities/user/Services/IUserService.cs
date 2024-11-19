using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IUserService : IService<User>
{
    public Task<UserCreatedResponse> CreateUser(UserCreatePayload payload);
    public Task<User> GetUserByIdentification(string identification);
    public Task<UserUpdatedResponse> UpdateUser(int id, UserUpdatePayload payload);
    public Task DeleteUser(int id);
}