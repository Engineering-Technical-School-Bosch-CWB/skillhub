using Api.Domain.Models;

namespace Api.Domain.Models;
public record CurricularUnitDTO(
    int Id,
    string Name,
    int SubjectAreaId
)
{
    public static CurricularUnitDTO Map(CurricularUnit obj)
    {
        return new CurricularUnitDTO(
            obj.Id,
            obj.Name,
            obj.SubjectArea.Id
        );
    }
}