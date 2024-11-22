using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class AttachmentRepository(SkillhubContext context) 
    : BaseRepository<Attachment>(context), IAttachmentRepository
{

}
