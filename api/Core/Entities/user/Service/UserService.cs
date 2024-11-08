using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class UserService(BaseRepository<User> repository)
    : BaseService<User>(repository), IUserService
{
    public async Task<User> GetByIdentification(string identification)
    {
        return await repository.GetAllNoTracking()
            .FirstOrDefaultAsync(u => u.Identification == identification);
    }
}
