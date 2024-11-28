using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Api.Domain.Models;

public class PositionCreatePayload()
{
    [Required]
    [StringLength(100)]
    public required string Name { get; set; }

    [Required]
    public required short PositionLevel { get; set; }
}

public class PositionUpdatePayload()
{
    [StringLength(100)]
    public string? Name { get; set; }
    public short? PositionLevel { get; set; }
}