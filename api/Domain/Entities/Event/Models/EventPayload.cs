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
    public required bool Is_active { get; set; }
    [Required]
    public required bool Movable { get; set;}
    [Required]
    public required DateTime Start_date { get; set; }
    public DateTime End_date { get; set; }
    public int? Subject_id { get; set; }
    public IEnumerable<int>? Classes_id { get; set; }
    public IEnumerable<EventMemberCreatePayload>? Members { get; set; }
    [Required]
    public required int EventTypeId { get; set; }    
}

public class EventUploadPayload
{
    [Required]
    public int Id { get; set; }
    [StringLength(55)]
    public string? Name { get; set; }
    [StringLength(255)]
    public string? Description { get; set;}
    public bool? Movable { get; set;}
    public DateTime? Start_date { get; set; }
    public DateTime? End_date { get; set; }
    public required IEnumerable<int> Classes_id { get; set; }
    public IEnumerable<EventMember>? Members { get; set; }
}