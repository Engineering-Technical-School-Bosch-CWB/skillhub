using System.ComponentModel.DataAnnotations;

namespace Api.Domain.Models;

public class CourseCreatePayload() {

    [Required(ErrorMessage = "The name is required.")]
    [StringLength(255, ErrorMessage = "The name cannot exceed 255 characters.")]
    public required string Name { get; set; }

    [Required(ErrorMessage = "The abbreviation is required.")]
    [StringLength(50, ErrorMessage = "The abbreviation cannot exceed 50 characters.")]
    public required string Abbreviation { get; set; }

    [Required(ErrorMessage = "The OccupationAreaId is required.")]
    public required int OccupationAreaId { get; set; }
};

public class CourseUpdatePayload() {

    [StringLength(255, ErrorMessage = "The name cannot exceed 255 characters.")]
    public string? Name { get; set; }

    [StringLength(50, ErrorMessage = "The abbreviation cannot exceed 50 characters.")]
    public string? Abbreviation { get; set; }
    
    public int? OccupationAreaId { get; set; }
};