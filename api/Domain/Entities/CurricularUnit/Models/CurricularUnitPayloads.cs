using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class CurricularUnitCreatePayload()
{
    [Required]
    [StringLength(255)]
    public required string Name { get; set; }

    [Required]
    public required int SubjectAreaId { get; set; }
}

public class CurricularUnitUpdatePayload()
{
    [StringLength(255)]
    public string? Name { get; set; }
    public int? SubjectAreaId { get; set; }
}