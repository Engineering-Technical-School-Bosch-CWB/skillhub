using Api.Domain.Models;

namespace api.Domain.Services.Login
{
    public record LoginResponse(
        bool FirstLogin, 
        User? User,
        string? AuthToken
    );
}