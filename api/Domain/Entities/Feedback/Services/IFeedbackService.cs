using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IFeedbackService : IService<Feedback>
{
    public Task<AppResponse<CompleteFeedbackDTO>> CreateFeedback(FeedbackCreatePayload payload, int loggedId);
    public Task<AppResponse<CompleteFeedbackDTO>> GetFeedbackById(int id);
}
