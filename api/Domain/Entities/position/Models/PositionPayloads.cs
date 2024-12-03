using System.ComponentModel.DataAnnotations;
using Api.Domain.Enums;

namespace Api.Domain.Models;

public class PositionCreatePayload
{
    [Required]
    [StringLength(100)]
    public required string Name { get; set; }

    [Required]
    [EnumDataType(typeof(EPositionLevel))]
    public required EPositionLevel PositionLevel { get; set; }
}

public class PositionUpdatePayload
{
    [StringLength(100)]
    public string? Name { get; set; }

    [EnumDataType(typeof(EPositionLevel))]
    public EPositionLevel? PositionLevel { get; set; }
}