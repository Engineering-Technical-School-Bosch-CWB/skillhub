namespace Api.Domain.Models;

public record PositionDTO(
		int Id,
		string Name)
{
	public static PositionDTO Map(Position obj)
	{
		return new PositionDTO(
		  obj.Id,
		  obj.Name
		);
	}
}