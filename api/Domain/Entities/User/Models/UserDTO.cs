using api.Migrations;
using Api.Core.Services;

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
    string? Identification,
    DateOnly? Birthday,
    ObjectDTO Position,
    ObjectDTO Sector,
    ObjectDTO OccupationArea,
    short? PermissionLevel,
    StudentDTO? StudentProfile,
    bool IsArchived,
    ImageDto? ProfilePicture = null
)
{
    public static UserDTO Map(User obj, StudentDTO? student = null)
    {
        return new UserDTO(
            obj.Id,
            obj.Name,
            obj.Identification,
            obj.Birthday,
            ObjectDTO.Map(obj.Position.Id, obj.Position.Name),
            ObjectDTO.Map(obj.Sector.Id, obj.Sector.Name),
            ObjectDTO.Map(obj.OccupationArea.Id, obj.OccupationArea.Name),
            obj.Position?.PermissionLevel,
            student,
            obj.IsArchived,
            ImageService.ConvertToDto(obj.ProfilePicture)
        );
    }
}

public record UserProfileDTO(
    int Id,
    string Name,
    string Identification,
    DateOnly? Birthday,
    Boolean IsArchived,
    string Position,
    string Sector,
    StudentProfileDTO? Student,
    ImageDto? ProfilePicture
)
{
    public static UserProfileDTO Map(User obj, StudentProfileDTO? studentProfile)
    {
        return new UserProfileDTO(
            obj.Id,
            obj.Name,
            obj.Identification,
            obj.Birthday,
            obj.IsArchived,
            obj.Position.Name,
            obj.Sector.Name,
            studentProfile,
            ImageService.ConvertToDto(obj.ProfilePicture)
        );
    }
}