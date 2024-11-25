using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Api.Domain.Models;

public class PositionPayload()
{
    [Required]
    [StringLength(100)]
    public required string Name { get; set; }
}