using Genesis.Core.Repositories;
using api.Domain.Repositories;
using api.Domain.Models;

namespace api.Core.Repositories;

public class UserRepository(Project_eContext context) 
    : BaseRepository<User>(context), IUserRepository
{

}
