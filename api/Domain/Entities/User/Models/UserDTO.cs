namespace Api.Domain.Models;

public record ObjectDTO(
    int Id,
    string Name
)
{
    public static ObjectDTO Map(int id, string name)
    {
        return new ObjectDTO(
            id,
            name
        );
    }
}

public record UserDTO(
    int Id,
    string Name,
    string Identification,
    DateOnly? Birthday,
    ObjectDTO Position,
    ObjectDTO Sector,
    ObjectDTO OccupationArea,
    short? PermissionLevel,
    StudentDTO? StudentProfile
)
{
    public static UserDTO Map(User obj, StudentDTO? student)
    {
        return new UserDTO(
            obj.Id,
            obj.Name,
            obj.Identification,
            obj.Birthday,
            ObjectDTO.Map(obj.Position.Id, obj.Position.Name),
            ObjectDTO.Map(obj.Sector.Id, obj.Sector.Name),
            ObjectDTO.Map(obj.OccupationArea.Id, obj.OccupationArea.Name),
            obj.Position?.PositionLevel,
            student
        );
    }
}
