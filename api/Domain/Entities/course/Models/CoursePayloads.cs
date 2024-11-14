namespace Api.Domain.Models;

public readonly record struct CourseCreatePayload(
    string Name,
    string Abbreviation,
    int OccupationAreaId
);

public readonly record struct CourseUpdatePayload(
    string? Name,
    string? Abbreviation,
    int? OccupationAreaId
);