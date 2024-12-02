namespace Api.Domain.Models;

public record CurricularUnitDTO(
    int Id,
    string Name,
    SubjectAreaDTO? SubjectArea
)
{
    public static CurricularUnitDTO Map(CurricularUnit obj)
    {
        return new CurricularUnitDTO(
            obj.Id,
            obj.Name,
            obj.SubjectArea is not null ? SubjectAreaDTO.Map(obj.SubjectArea) : null
        );
    }
}
