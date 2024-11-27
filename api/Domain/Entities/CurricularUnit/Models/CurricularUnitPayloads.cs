using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;
public class CreateCurricularUnitPayload
{
    [StringLength(2)]
    public required string Name { get; set; }
    public required int SubjectAreaId { get; set; }
}

public class UpdateCurricularUnitPayload
{
    [StringLength(2)]
    public string? Name { get; set; }
    public int? SubjectAreaId { get; set; }
}