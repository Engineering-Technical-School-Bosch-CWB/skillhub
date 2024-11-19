namespace Api.Domain.Models;

public class PositionDTO
{
  public required int Id { get; set; } 
  public required string Name { get; set; } 

  public static PositionDTO Map(Position position)
  {
    return new PositionDTO()
    {
        Id = position.Id,
        Name = position.Name
    };
  }
}