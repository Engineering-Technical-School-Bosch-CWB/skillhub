namespace Api.Domain.Services;
public interface IJwtService
{
    public OutboundToken GenerateToken(LoginResult.Succeeded auth);
    public void ValidateToken(string jwt);
}