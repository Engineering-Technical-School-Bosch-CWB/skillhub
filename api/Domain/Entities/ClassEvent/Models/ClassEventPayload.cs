using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class ClassEventPayload
{
    public int? SubjectId { get; set; }
    public int? ClassId { get; set; }
    public int? EventId { get; set; }
}