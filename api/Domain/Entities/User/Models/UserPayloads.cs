using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;
public class UserCreatePayload
{
    [Required]
    public required int SectorId { get; set; }

    [Required]
    public required int PositionId { get; set; }

    [Required]
    public required int OccupationAreaId { get; set; }

    [Required]
    [StringLength(500)]
    public required string Name { get; set; }

    [Required]
    [StringLength(100)]
    public required string Identification { get; set; }
}

public class UserUpdatePayload
{
    public int? SectorId { get; set; }

    public int? PositionId { get; set; }

    public int? OccupationAreaId { get; set; }

    [StringLength(500)]
    public string? Name { get; set; }

    [StringLength(100)]
    public string? Identification { get; set; }

    public DateOnly? Birthday { get; set; }

    public string? Password { get; set; }

    public string? ConfirmPassword { get; set; }
}
