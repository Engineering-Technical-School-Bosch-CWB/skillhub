using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class UserRepository(Project_eContext context)
    : BaseRepository<User>(context), IUserRepository
{
}
