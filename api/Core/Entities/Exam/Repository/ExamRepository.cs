using Genesis.Core.Repositories;
using Api.Domain.Repositories;
using Api.Domain.Models;

namespace Api.Core.Repositories;

public class ExamRepository(SkillhubContext context) 
    : BaseRepository<Exam>(context), IExamRepository
{

}
