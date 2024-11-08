namespace Api.Domain.JWTService
{
    public interface IJwtService
    {
        public OutboundToken GenerateToken(LoginResult.Succeeded auth);
        public void ValidateToken(string jwt);
    }
}