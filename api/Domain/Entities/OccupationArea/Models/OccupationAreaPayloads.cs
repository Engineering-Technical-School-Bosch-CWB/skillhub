using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public record UpdateOcupationAreaPayload
{
    [Required]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }


    public static UpdateOcupationAreaPayload Map(OccupationArea obj) => new UpdateOcupationAreaPayload
    {
        Id = obj.Id,
        Name = obj.Name
    };
}