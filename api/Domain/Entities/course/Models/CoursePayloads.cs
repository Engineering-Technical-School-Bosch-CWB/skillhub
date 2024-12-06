using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class CourseCreatePayload {

    [Required]
    [StringLength(255)]
    public required string Name { get; set; }

    [Required]
    [StringLength(50)]
    public required string Abbreviation { get; set; }

    [Required]
    public required int OccupationAreaId { get; set; }
};

public class CourseUpdatePayload {

    [StringLength(255)]
    public string? Name { get; set; }

    [StringLength(50)]
    public string? Abbreviation { get; set; }
    
    public int? OccupationAreaId { get; set; }
};