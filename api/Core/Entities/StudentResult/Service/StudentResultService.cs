using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Api.Domain.Repositories;

namespace Api.Core.Services;

public class StudentResultService(BaseRepository<User> repository, IStudentResultRepository studentResultRepository,
    ISkillResultRepository skillResultRepository
) : BaseService<User>(repository), IStudentResultService
{
    private readonly IStudentResultRepository _repo = studentResultRepository;
    private readonly ISkillResultRepository _skillResultRepo = skillResultRepository;

    #region CRUD

    #endregion

    #region Services

    public async Task AttExamResult(Exam exam)
    {
        var examResults = exam.SkillResults
            .GroupBy(s => s.Skill.Id)
            .Select(g => g.MaxBy(s => s.EvaluatedAt)!)
            .GroupBy(s => s.Student)
            .Select(g => new
            {
                Student = g.Key,
                Score = g.Sum(s => s.Aptitude * s.Weight) / g.Sum(s => s.Weight)
            });

        foreach (var result in examResults) await UpdateExamResult(result.Student, exam, result.Score);

        var subjectResults = _repo.Get()
            .Where(s => s.IsActive)
            .Where(s => s.Exam!.Subject.Id == exam.Subject.Id)
            .GroupBy(s => s.Student)
            .Select(g => new {
                Student = g.Key,
                Score = g.Average(s => s.Score)
            });

        foreach (var result in examResults) await UpdateSubjectResult(result.Student, exam.Subject, result.Score);
    }

    public async Task UpdateExamResult(Student student, Exam exam, double? score)
    {
        var studentResultExam = await _repo.Get()
            .Where(s => s.IsActive && s.Student.Id == student.Id && s.Exam!.Id == exam.Id)
            .SingleOrDefaultAsync();

        if (studentResultExam is not null)
        {
            studentResultExam.Score = score;
            _repo.Update(studentResultExam);
        }
        else
        {
            var studentResult = new StudentResult
            {
                Student = student,
                Score = score,
                Exam = exam
            };

            _repo.Add(studentResult);
        }

        await _repo.SaveAsync();
    }

    public async Task UpdateSubjectResult(Student student, Subject subject, double? score)
    {
        var studentResultSubject = await _repo.Get()
            .Where(s => s.IsActive && s.Student.Id == student.Id && s.Subject!.Id == subject.Id)
            .SingleOrDefaultAsync();

        var skillResults = await _skillResultRepo.Get()
            .Where(s => s.IsActive && s.Student.Id == student.Id)
            .Where(s => s.Skill.CurricularUnit.Id == subject.CurricularUnit.Id)
            .GroupBy(s => s.Skill)
            .Select(g => g.OrderByDescending(s => s.Aptitude).First())
            .ToListAsync();

        var skillScore = skillResults.Count != 0 ? skillResults.Average(s => s.Aptitude) : null;

        if (studentResultSubject is not null)
        {
            studentResultSubject.Score = score;
            studentResultSubject.SkillScore = skillScore;
            _repo.Update(studentResultSubject);
        }
        else
        {
            var studentResult = new StudentResult
            {
                Student = student,
                Score = score,
                SkillScore = skillScore,
                Subject = subject
            };

            _repo.Add(studentResult);
        }

        await _repo.SaveAsync();
    }

    #endregion

    #region Pages

    #endregion
}
