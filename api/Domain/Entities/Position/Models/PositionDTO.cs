using Api.Domain.Enums;

namespace Api.Domain.Models;

public record PositionDTO(
	int Id,
	string Name,
	EPermissionLevel PositionLevel,
	EPositionType PositionType
)
{
	public static PositionDTO Map(Position obj)
	{
		return new PositionDTO(
		  obj.Id,
		  obj.Name,
		  (EPermissionLevel)obj.PermissionLevel,
		  (EPositionType)obj.PositionType
		);
	}
}
