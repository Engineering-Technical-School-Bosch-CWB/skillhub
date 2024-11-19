using Api.Domain.Services;

public record PaginatedAppResponse<T>(IEnumerable<T> data, PaginationInfo info, string message);