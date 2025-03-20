using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IClassService : IService<Class>
{
    public Task<AppResponse<IEnumerable<ClassDTO>>> GetClasses(string? query);
    public Task<AppResponse<ClassDTO>> CreateClass(ClassCreatePayload payload);
    public Task<AppResponse<SimpleClassDTO>> UpdateClass(int id, ClassUpdatePayload payload);
    public Task DeleteClass(int id);
    public Task ArchiveClass(int id);
    public Task UnarchiveClass(int id);
    public Task<AppResponse<ClassPageDTO>> GetClassPage(int id, string? query, int? selectedStudentId, int? selectedCurricularUnitId, int? selectedSubjectAreaId);
}
