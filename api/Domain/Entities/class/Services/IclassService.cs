using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IClassService : IService<Class>
{
    public Task<AppResponse<ClassDTO>> CreateClass(ClassCreatePayload payload);
    public Task<AppResponse<ClassPageDTO>> GetClassPage(int id, int? subjectAreaId, int? selectedStudentId, int? selectedCurricularUnitId, int? selectedSubjectAreaId);
}
