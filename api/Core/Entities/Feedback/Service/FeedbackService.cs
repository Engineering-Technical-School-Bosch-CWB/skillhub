using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;
using Api.Domain.Repositories;

namespace Api.Core.Services;

public class FeedbackService(
    BaseRepository<Feedback> repository, IStudentRepository studentRepository, IUserRepository userRepository, ISubjectRepository subjectRepository
) : BaseService<Feedback>(repository), IFeedbackService
{
    private readonly BaseRepository<Feedback> _repo = repository;
    private readonly IStudentRepository _studentRepo = studentRepository;
    private readonly IUserRepository _userRepo = userRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;

    #region CRUD

    public async Task<AppResponse<CompleteFeedbackDTO>> CreateFeedback(FeedbackCreatePayload payload, int loggedId)
    {
        var student = await _studentRepo.Get()
            .Where(s => s.IsActive)
            .Include(s => s.User)
            .SingleOrDefaultAsync(s => s.Id == payload.StudentId)
            ?? throw new NotFoundException("Student not found!");

        if (student.User.Id == loggedId)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var instructor = await _userRepo.Get()
            .Where(u => u.IsActive)
            .SingleOrDefaultAsync(u => u.Id == loggedId)
            ?? throw new UnknownServerError("User authentication error!");

        Subject? subject = null;

        if (payload.SubjectId.HasValue)
        {
            var hasFeedback = await _repo.Get()
                .Where(f => f.IsActive)
                .Where(f => f.Student.Id == payload.StudentId)
                .Where(f => f.Subject!.Id == payload.SubjectId)
                .SingleOrDefaultAsync();

            if (hasFeedback is not null) throw new AlreadyExistsException("Student already has a feedback for this subject!");

            subject = await _subjectRepo.Get()
                .Where(s => s.IsActive)
                .Include(s => s.CurricularUnit)
                .SingleOrDefaultAsync(s => s.Id == payload.SubjectId)
                ?? throw new NotFoundException("Subject not found!");
        }


        var newFeedback = new Feedback()
        {
            Instructor = instructor,
            Student = student,
            Subject = subject,
            Content = payload.Content,
            UpdatedAt = DateTime.Now,
            StudentMayVisualize = payload.SubjectId.HasValue,
        };

        var savedFeedback = _repo.Add(newFeedback)
            ?? throw new UpsertFailException("Feedback could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<CompleteFeedbackDTO>(
            CompleteFeedbackDTO.Map(savedFeedback),
            "Feedback created successfuly!"
        );
    }

    public async Task<AppResponse<CompleteFeedbackDTO>> UpdateFeedback(int id, FeedbackUpdatePayload payload, int loggedId)
    {

        var feedback = await _repo.Get()
            .Where(f => f.IsActive)
            .Include(f => f.Instructor)
            .Include(f => f.Student.User)
            .Include(f => f.Subject!.CurricularUnit)
            .SingleOrDefaultAsync(f => f.Id == id)
            ?? throw new NotFoundException("Feedback not found!");

        if (feedback.Instructor.Id != loggedId)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var instructor = await _userRepo.Get()
            .Where(u => u.IsActive)
            .SingleOrDefaultAsync(u => u.Id == loggedId)
            ?? throw new UnknownServerError("User authentication error!");

        feedback.Content = payload.Content;
        feedback.Instructor = instructor;
        feedback.UpdatedAt = DateTime.Now;

        var updatedFeedback =
            _repo.Update(feedback)
            ?? throw new UpsertFailException("Feedback could not be updated!");

        await _repo.SaveAsync();

        return new AppResponse<CompleteFeedbackDTO>(
            CompleteFeedbackDTO.Map(updatedFeedback),
            "Feedback updated successfuly!"
        );
    }

    public async Task DeleteFeedback(int id, int loggedId)
    {
        var feedback = await _repo.Get()
            .Where(f => f.IsActive)
            .Include(f => f.Instructor)
            .Include(f => f.Subject)
            .SingleOrDefaultAsync(f => f.Id == id)
            ?? throw new NotFoundException("Feedback not found!");

        if (feedback.Instructor.Id != loggedId || feedback.Subject is not null)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        feedback.IsActive = false;

        var deletedFeedback =
            _repo.Update(feedback)
            ?? throw new DeleteFailException("Feedback could not be deleted!");

        await _repo.SaveAsync();
    }

    public async Task<AppResponse<CompleteFeedbackDTO>> GetFeedbackById(int id)
    {
        var feedback = await _repo.Get()
            .Where(f => f.IsActive)
            .Include(f => f.Instructor)
            .Include(f => f.Student.User)
            .Include(f => f.Subject!.CurricularUnit)
            .SingleOrDefaultAsync(f => f.Id == id)
            ?? throw new NotFoundException("Feedback not found!");

        return new AppResponse<CompleteFeedbackDTO>(
            CompleteFeedbackDTO.Map(feedback),
            "Feedback found!"
        );
    }

    #endregion
}
