using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class UserImageRepository(Project_eContext context) 
    : BaseRepository<UserImage>(context), IUserImageRepository
{

}
