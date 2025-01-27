using Api.Domain.Enums;

namespace Api.Domain.Models;

public record PositionDTO(
	int Id,
	string Name,
	EPermissionLevel PositionLevel
)
{
	public static PositionDTO Map(Position obj)
	{
		return new PositionDTO(
		  obj.Id,
		  obj.Name,
		  (EPermissionLevel)obj.PositionLevel
		);
	}
}
