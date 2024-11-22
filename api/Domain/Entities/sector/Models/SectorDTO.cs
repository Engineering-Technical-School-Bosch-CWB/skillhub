namespace Api.Domain.Models;

public class SectorDTO
{
  public required int Id { get; set; } 
  public required string Name { get; set; } 

  public static SectorDTO Map(Sector position)
  {
    return new SectorDTO()
    {
        Id = position.Id,
        Name = position.Name
    };
  }
}