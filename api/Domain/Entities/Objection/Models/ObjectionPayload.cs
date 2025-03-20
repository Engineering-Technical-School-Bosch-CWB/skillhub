using System.ComponentModel.DataAnnotations;
using Api.Domain.Enums;

namespace Api.Domain.Models;

public class ObjectionPayload
{
    [Required]
    [EnumDataType(typeof(EAptitude))]
    public required EAptitude ClaimedAptitude { get; set; }

    [Required]
    public required int SkillResultId { get; set; }
}
