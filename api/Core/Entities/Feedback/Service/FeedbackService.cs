using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class FeedbackService(BaseRepository<Feedback> repository)
    : BaseService<Feedback> (repository), IFeedbackService
{
    private readonly BaseRepository<Feedback> _repo = repository;

    public async Task<AppResponse<CompleteFeedbackDTO>> GetFeedbackById(int id)
    {
        var feedback = await _repo.Get()
            .Where(f => f.IsActive)
            .Include(f => f.Instructor)
            .Include(f => f.Subject!.CurricularUnit)
            .SingleOrDefaultAsync(f => f.Id == id)
            ?? throw new NotFoundException("Feedback not found!");

        return new AppResponse<CompleteFeedbackDTO>(
            CompleteFeedbackDTO.Map(feedback),
            "Feedback found!"
        );
    }
}
