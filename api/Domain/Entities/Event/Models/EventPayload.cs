using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class EventCreatePayload
{
    [Required]
    [StringLength(55)]
    public required string Name { get; set; }
    [StringLength(255)]
    public string? Description { get; set;}

    [Required]
    public int EventTypeId { get; set; }    
}

public class EventUploadPayload
{
    [Required]
    [StringLength(55)]
    public required string Name { get; set; }

    [StringLength(255)]
    public string? Description { get; set;}

    [Required]
    public int EventTypeId { get; set; }    
}