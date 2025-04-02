using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class EventTypeCreatePayload
{
    [Required]
    [StringLength(50)]
    public required string Name { get; set; }
    [Required]
    public required string Icon { get; set; }
    [Required]
    public required bool Disable { get; set; }
    [Required]
    public required bool Saturday { get; set; }
    [Required]
    public required bool Allday { get; set; }
    [Required]
    public required bool AllClasses { get; set; }
    [Required]
    [StringLength(8)]
    public required string Color { get; set; }
}