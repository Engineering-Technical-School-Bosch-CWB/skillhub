namespace Api.Domain.Services;
public interface ILoginService
{
    Task<LoginResponse> TryLogin(LoginPayload payload);
}