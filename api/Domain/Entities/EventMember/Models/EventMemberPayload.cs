using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class EventMemberCreatePayload
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public bool Is_Responsible { get; set;}

    [Required]
    public int EventId {get; set;}
}

public class EventMemberUpdatePayload
{
    public bool? Is_Responsible { get; set;}
}