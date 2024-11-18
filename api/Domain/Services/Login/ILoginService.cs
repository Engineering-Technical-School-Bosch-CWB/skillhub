namespace Api.Domain.Services.Login
{
    public interface ILoginService
    {
        Task<LoginResponse> TryLogin(LoginPayload payload);
    }
}