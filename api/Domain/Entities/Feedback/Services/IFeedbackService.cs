using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IFeedbackService : IService<Feedback>
{
    public Task<AppResponse<CompleteFeedbackDTO>> CreateFeedback(FeedbackCreatePayload payload, int loggedId);
    public Task<AppResponse<CompleteFeedbackDTO>> UpdateFeedback(int id, FeedbackUpdatePayload payload, int loggedId);
    public Task DeleteFeedback(int id, int loggedId);
    public Task<AppResponse<CompleteFeedbackDTO>> GetFeedbackById(int id);
}
