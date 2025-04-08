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

public class EventTypeUpdatePayload
{
    [StringLength(50)]
    public  string? Name { get; set; }

    public string? Icon { get; set; }

    public bool? Disable { get; set; }

    public bool? Saturday { get; set; }

    public bool? Allday { get; set; }

    public bool? AllClasses { get; set; }
    [StringLength(8)]
    public string? Color { get; set; }
}