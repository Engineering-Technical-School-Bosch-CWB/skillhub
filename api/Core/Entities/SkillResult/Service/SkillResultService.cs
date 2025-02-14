using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Api.Core.Services;

public class SkillResultService(BaseRepository<SkillResult> repository, ISkillRepository skillRepository, IStudentRepository studentRepository,
        IExamRepository examRepository, ISubjectRepository subjectRepository, IObjectionRepository objectionRepository, IStudentResultService studentResultService,
        IStudentService studentService, ISkillService skillService, IStudentResultRepository studentResultRepository
    ) : BaseService<SkillResult>(repository), ISkillResultService
{
    private readonly BaseRepository<SkillResult> _repo = repository;
    private readonly ISkillRepository _skillRepo = skillRepository;
    private readonly IStudentRepository _studentRepo = studentRepository;
    private readonly IExamRepository _examRepo = examRepository;
    private readonly ISubjectRepository _subjectRepo = subjectRepository;
    private readonly IObjectionRepository _objectionRepo = objectionRepository;
    private readonly IStudentResultRepository _studentResultRepo = studentResultRepository;

    private readonly IStudentService _studentService = studentService;
    private readonly ISkillService _skillService = skillService;
    private readonly IStudentResultService _studentResultService = studentResultService;


    #region CRUD

    public async Task<AppResponse<CompleteSkillResultDTO>> CreateSkillResult(SkillResultCreatePayload payload)
    {
        var student = await _studentRepo.Get()
            .Include(s => s.Class)
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == payload.StudentId)
            ?? throw new NotFoundException("Student not found!");

        var skill = await _skillRepo.Get()
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == payload.SkillId)
            ?? throw new NotFoundException("Skill not found!");


        var newSkillResult = new SkillResult()
        {
            Weight = payload.Weight,
            Skill = skill,
            Student = student
        };

        if (payload.ExamId.HasValue)
            newSkillResult.Exam = await _examRepo.Get()
                .Where(e => e.IsActive)
                .SingleOrDefaultAsync(e => e.Id == payload.ExamId.Value)
                ?? throw new NotFoundException("Exam not found!");
        else if (payload.SubjectId.HasValue)
            newSkillResult.Subject = await _subjectRepo.Get()
                .Where(s => s.IsActive)
                .SingleOrDefaultAsync(s => s.Id == payload.SubjectId.Value)
                ?? throw new NotFoundException("Subject not found!");
        else if (payload.ObjectionId.HasValue)
            newSkillResult.Objection = await _objectionRepo.Get()
                .Where(s => s.IsActive)
                .SingleOrDefaultAsync(s => s.Id == payload.ObjectionId.Value)
                ?? throw new NotFoundException("Objection not found!");

        var createdSkillResult = _repo.Add(newSkillResult)
            ?? throw new UpsertFailException("Skill result could not be inserted!");

        await _repo.SaveAsync();

        return new AppResponse<CompleteSkillResultDTO>(
            CompleteSkillResultDTO.Map(createdSkillResult, _skillService.GetSkillAverageByClass(skill.Id, student.Class.Id)),
            "Skill result created successfully!"
        );
    }

    #endregion

    #region Services

    public async Task<AppResponse<CompleteSkillResultDTO>> GetSkillResultBySkill(int skillId, int studentId)
    {
        var skillResult = await _repo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Skill.Id == skillId && s.Student.Id == studentId)
            .Include(s => s.Skill)
            .OrderByDescending(s => s.EvaluatedAt)
            .FirstAsync()
            ?? throw new NotFoundException("Skill result not found!");

        return new AppResponse<CompleteSkillResultDTO>(
            CompleteSkillResultDTO.Map(skillResult),
            "Skill result found!"
        );
    }

    public async Task<AppResponse<IEnumerable<SkillResult>>> EvaluateExam(int examId, IEnumerable<StudentEvaluatePayload> payload)
    {
        var exam = await _examRepo.Get()
            .Where(e => e.IsActive)
            .Include(e => e.Subject)
            .SingleOrDefaultAsync(e => e.Id == examId)
            ?? throw new NotFoundException("Exam not found!");

        foreach (var studentPayload in payload)
        {
            var student = await _studentRepo.Get()
                .Where(s => s.IsActive)
                .SingleOrDefaultAsync(s => s.Id == studentPayload.StudentId)
                ?? throw new NotFoundException("Student not found!");

            foreach (var r in studentPayload.Results)
            {
                var obj = await _repo.Get()
                    .Where(o => o.IsActive && o.Exam!.Id == examId && o.Skill.Id == r.SkillId && o.Student.Id == studentPayload.StudentId)
                    .SingleOrDefaultAsync()
                    ?? throw new NotFoundException("Skill result not found!");

                obj.EvaluatedAt = DateTime.Now;
                obj.Aptitude = (short?)r.Aptitude;

                _ = _repo.Update(obj) ?? throw new UpsertFailException("Skill result could not be updated!");
            }

            await _repo.SaveAsync();

            var examScore = _studentService.GetExamResults(studentPayload.StudentId, examId);
            await _studentResultService.UpdateExamResult(student, exam, examScore.Mean);

            var studentResults = await _studentResultRepo.Get()
                .Where(s => s.IsActive && s.Student.Id == studentPayload.StudentId)
                .Include(s => s.Exam!.Subject)
                .Include(s => s.Subject)
                .ToListAsync();

            var subjectResults = studentResults
                .Where(r => r.Exam!.Subject.Id == exam.Subject.Id)
                .Select(s => s.Score)
                .AsEnumerable();

            await _studentResultService.UpdateSubjectResult(student, exam.Subject, subjectResults.Any() ? subjectResults.Average() : null);
            await _studentService.AttStudentScores(studentPayload.StudentId);
        }

        return new AppResponse<IEnumerable<SkillResult>>(
            [],
            "Skill Results updated successfully!"
        );
    }

    #endregion

    #region Pages

    public async Task<AppResponse<SkillHistoryResponse>> GetSkillResultHistory(int studentId, int skillId)
    {
        var skill = _skillRepo.Get()
            .Include(s => s.CurricularUnit)
            .Where(s => s.IsActive)
            .SingleOrDefault(s => s.Id == skillId)
            ?? throw new NotFoundException("Skill not found!");

        var history = await _repo.Get()
            .Include(s => s.Exam)
            .Include(s => s.Objection)
            .Where(s => s.IsActive)
            .Where(s => s.Aptitude.HasValue)
            .Where(s => s.Student.Id == studentId && s.Skill.Id == skillId)
            .OrderByDescending(s => s.EvaluatedAt)
            .Select(s => SkillResultHistoryDTO.Map(s))
            .ToListAsync();

        return new AppResponse<SkillHistoryResponse>(
            SkillHistoryResponse.Map(SkillDTO.Map(skill), history),
            "Skill history found!"
        );
    }

    public async Task<AppResponse<EvaluateExamDTO>> GetExamEvaluationPage(int examId)
    {
        var exam = await _examRepo.Get()
            .Where(e => e.IsActive)
            .Include(e => e.Subject.CurricularUnit)
            .Include(e => e.Subject.Class)
            .SingleOrDefaultAsync(e => e.Id == examId)
            ?? throw new NotFoundException("Exam not found!");

        var results = await _repo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Exam!.Id == examId)
            .Include(s => s.Student.User)
            .Include(s => s.Skill)
            .GroupBy(s => s.Student)
            .Select(g => ExamEvaluationResultDTO.Map(g.Key, g.Select(s => SkillResultDTO.Map(s))))
            .ToListAsync();

        return new AppResponse<EvaluateExamDTO>(
            EvaluateExamDTO.Map(exam.Subject, exam, results.OrderBy(r => r.Student.Name)),
            "Exam results found"
        );
    }

    #endregion
}
