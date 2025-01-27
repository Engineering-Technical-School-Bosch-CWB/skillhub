using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IClassService : IService<Class>
{
    public Task<AppResponse<IEnumerable<ClassDTO>>> GetClasses(string? query);
    public Task<AppResponse<ClassDTO>> CreateClass(ClassCreatePayload payload);
    public Task<AppResponse<ClassPageDTO>> GetClassPage(int id, string? query, int? selectedStudentId, int? selectedCurricularUnitId, int? selectedSubjectAreaId);
}
