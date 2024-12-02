using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Services;

public class LoginPayload
{
    [Required]
    [StringLength(100)]
    public required string Identification { get; set; }

    [Required]
    [StringLength(255)]
    public required string Password { get; set; }
}    