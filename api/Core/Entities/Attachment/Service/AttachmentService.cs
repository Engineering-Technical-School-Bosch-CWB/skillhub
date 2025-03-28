using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Core.Services;

public class AttachmentService(BaseRepository<Attachment> repository)
: BaseService<Attachment> (repository), IAttachmentService
{

}