using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class PostRepository(SkillhubContext context) 
    : BaseRepository<Post>(context), IPostRepository
{

}
