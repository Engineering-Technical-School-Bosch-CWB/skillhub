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
    PositionDTO Position,
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
            PositionDTO.Map(obj.Position),
            ObjectDTO.Map(obj.Sector.Id, obj.Sector.Name),
            ObjectDTO.Map(obj.OccupationArea.Id, obj.OccupationArea.Name),
            obj.Position?.PermissionLevel,
            student,
            obj.IsArchived,
            ImageService.ConvertToDto(obj.ProfilePicture)
        );
    }
}

public record UserBirthdayDTO(
    int Id,
    string Name,
    string Position,
    string Group,
    int ClassId,
    DateOnly? Birthday,
    ImageDto? ProfilePicture = null
)
{
    public static UserBirthdayDTO Map(User obj, Class? @class = null)
    {
        return new UserBirthdayDTO(
            obj.Id,
            obj.Name,
            obj.Position.Name,
            @class?.Abbreviation ?? "",
            @class?.Id ?? 0,
            obj.Birthday,
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