using Genesis.Core.Services;
using Genesis.Core.Repositories;

using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Core.Services;

public class UserImageService(BaseRepository<UserImage> repository)
    : BaseService<UserImage> (repository), IUserImageService
{

}
