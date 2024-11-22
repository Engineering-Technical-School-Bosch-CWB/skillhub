using Api.Domain.Models;

namespace Api.Domain.Services;
public interface IJwtService
{
    public OutboundToken GenerateToken(UserDTO user);
    public void ValidateToken(string jwt);
}