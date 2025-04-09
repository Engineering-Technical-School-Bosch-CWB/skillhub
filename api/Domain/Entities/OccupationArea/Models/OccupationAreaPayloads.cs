using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public record UpdateOccupationAreaPayload
{
    [Required]
    public required int Id { get; set; }
    [Required]
    public required string Name { get; set; }


    public static UpdateOccupationAreaPayload Map(OccupationArea obj) => new UpdateOccupationAreaPayload
    {
        Id = obj.Id,
        Name = obj.Name
    };
}