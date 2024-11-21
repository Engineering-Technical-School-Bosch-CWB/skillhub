namespace Api.Domain.Models;
public record AppResponse<T>(T data, string message);