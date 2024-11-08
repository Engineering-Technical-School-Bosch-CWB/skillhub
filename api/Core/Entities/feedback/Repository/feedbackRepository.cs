using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class FeedbackRepository(Project_eContext context) 
    : BaseRepository<Feedback>(context), IFeedbackRepository
{

}
