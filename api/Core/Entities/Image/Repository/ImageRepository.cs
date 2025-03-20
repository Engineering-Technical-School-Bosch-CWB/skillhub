using Genesis.Core.Repositories;

using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class ImageRepository(SkillhubContext context) 
    : BaseRepository<Image>(context), IImageRepository
{

}
