namespace Api.Domain.Models;
public record AppResponse<T>(T Data, string Message);