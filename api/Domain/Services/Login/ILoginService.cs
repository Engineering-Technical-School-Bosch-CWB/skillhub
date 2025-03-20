using Api.Domain.Models;

namespace Api.Domain.Services;
public interface ILoginService
{
    Task<AppResponse<LoginResponse>> TryLogin(LoginPayload payload);
    Task ResetPassword(int userId);
}