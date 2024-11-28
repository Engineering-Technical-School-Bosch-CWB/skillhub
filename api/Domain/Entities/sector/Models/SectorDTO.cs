namespace Api.Domain.Models;

public record SectorDTO(
  int Id,
  string Name
)
{
  public static SectorDTO Map(Sector obj)
  {
    return new SectorDTO(
      obj.Id,
      obj.Name
    );
  }
}