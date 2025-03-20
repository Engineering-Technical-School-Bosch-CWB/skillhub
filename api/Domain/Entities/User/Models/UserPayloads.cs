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

    public DateOnly? Birthday { get; set; }

    [Required]
    [StringLength(60, MinimumLength = 5)]
    public required string Name { get; set; }

    [Required]
    [StringLength(8, MinimumLength = 8)]
    public required string Identification { get; set; }
}

public class UserUpdatePayload
{
    public int? SectorId { get; set; }

    public int? PositionId { get; set; }

    public int? OccupationAreaId { get; set; }
  
    public int? ClassId { get; set; }

    [StringLength(60, MinimumLength = 5)]
    public string? Name { get; set; }

    [StringLength(8, MinimumLength = 8)]
    public string? Identification { get; set; }

    public DateOnly? Birthday { get; set; }

    [RegularExpression(@"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%&*()_+\-=]{8,}$", ErrorMessage = "Password is not valid")]
    public string? Password { get; set; }

    [StringLength(255)]
    public string? ConfirmPassword { get; set; }
}
