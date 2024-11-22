using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;
public class StudentCreatePayload()
{
    [Required]
    public required int UserId { get; set; }

    [Required]
    public required int ClassId { get; set; }
}