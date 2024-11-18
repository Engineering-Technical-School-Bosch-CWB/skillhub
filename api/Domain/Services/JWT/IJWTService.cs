namespace Api.Domain.Services.JWT
{
    public interface IJwtService
    {
        public OutboundToken GenerateToken(LoginResult.Succeeded auth);
        public void ValidateToken(string jwt);
    }
}