using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class SectorCreatePayload()
{
    [Required]
    public required string Name { get; set; }
}

public class SectorUpdatePayload()
{
    public string? Name { get; set; }
}