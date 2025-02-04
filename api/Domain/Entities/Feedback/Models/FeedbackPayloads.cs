using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class FeedbackCreatePayload
{
    [Required]
    public required int StudentId { get; set; }
    
    [Required]
    public required string Content { get; set; }
    
    public int? SubjectId { get; set; }
}

public class FeedbackUpdatePayload
{
    [Required]
    public required string Content { get; set; }
}