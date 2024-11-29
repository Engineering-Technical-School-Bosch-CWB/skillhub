using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;
public class SubjectAreaPayload()
{
    [Required]
    [StringLength(255)]
    public required string Name { get; set; }
}
