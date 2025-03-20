using System.ComponentModel.DataAnnotations;
using Api.Domain.Enums;

namespace Api.Domain.Models;

public class PositionCreatePayload
{
    [Required]
    [StringLength(100)]
    public required string Name { get; set; }

    [Required]
    [EnumDataType(typeof(EPermissionLevel))]
    public required EPermissionLevel PermissionLevel { get; set; }

    [Required]
    [EnumDataType(typeof(EPositionType))]
    public required EPositionType PositionType { get; set; }
}

public class PositionUpdatePayload
{
    [StringLength(100)]
    public string? Name { get; set; }

    [EnumDataType(typeof(EPermissionLevel))]
    public EPermissionLevel? PermissionLevel { get; set; }

    [EnumDataType(typeof(EPositionType))]
    public EPositionType? PositionType { get; set; }
}
