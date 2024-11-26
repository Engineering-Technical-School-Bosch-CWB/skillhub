using Api.Domain.Services;

public record PaginatedAppResponse<T>(IEnumerable<T> Data, PaginationInfo Info, string Message);