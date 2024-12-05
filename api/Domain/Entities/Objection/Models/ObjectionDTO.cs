using Api.Domain.Enums;

namespace Api.Domain.Models;

public record ObjectionDTO(
    int Id,
    EAptitude ClaimedAptitude,
    EAptitude OfficialAptitude,
    DateOnly ObjectedAt,
    bool IsAccepted,
    int SkillResultId
)
{
    public static ObjectionDTO Map(Objection obj)
    {
        return new ObjectionDTO(
            obj.Id,
            (EAptitude)obj.ClaimedAptitude,
            (EAptitude)obj.OfficialAptitude,
            obj.ObjectedAt,
            obj.IsAccepted,
            obj.SkillResult.Id
        );
    }
}