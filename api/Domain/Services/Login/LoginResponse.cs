using Api.Domain.Models;

namespace Api.Domain.Services.Login
{
    public readonly record struct LoginResponse(
        bool FirstLogin, 
        User? User,
        OutboundToken? AuthToken
    );
}