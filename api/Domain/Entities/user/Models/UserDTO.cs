using Api.Domain.Models;

public class UserDTO
{
    public required int Id { get; set; }
    public required string Name { get; set; } 
    public required string Identification { get; set; }
    public string? Birthday { get; set; }
    public PositionDTO? Position { get; set; }
    public SectorDTO? Sector { get; set; }
    public OccupationAreaDTO Area { get; set; }
    public int StudentProfile { get; set; }

    public static UserDTO Map( User user)
    {
        return new UserDTO()
        {
            Id = user.Id,
            Identification = user.Identification,
            Name = user.Name,
            Birthday = user.Birthday.ToString(),
            Area = OccupationAreaDTO.Map(user.Area),
            Position = PositionDTO.Map(user.Position),
            Sector = SectorDTO.Map(user.Sector)
        };
    }
}

// public class SimpleUserDTO
// {
//     public required int Id { get; set; }
//     public required string Name { get; set; } 
//     public required string Identification { get; set; }
//     public DateTime? Birthday { get; set; }
//     public int PositionId { get; set; }
//     public int SectorId { get; set; }
//     public int AreaId { get; set; }
//     public int? StudentProfileId { get; set; }

//     public static SimpleUserDTO Map(User user)
//     {
//         return new SimpleUserDTO()
//         {
//             Id = user.Id,
//             Identification = user.Identification,
//             Name = user.Name,
//             Birthday = user.Birthday,
//             AreaId = user.Area.Id,
//             PositionId = user.Position.Id,
//             SectorId = user.Sector.Id,
//             StudentProfileId = user.StudentProfile.Id
//         };
//     }
    
// }