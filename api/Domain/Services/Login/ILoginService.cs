namespace api.Domain.Services.Login
{
    public interface ILoginService
    {
        Task<LoginResponse> TryLogin(LoginPayload payload);
    }
}