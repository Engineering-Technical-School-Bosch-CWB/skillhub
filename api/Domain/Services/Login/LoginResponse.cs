using Api.Domain.Models;
using Api.Domain.Services.JWT;

namespace Api.Domain.Services.Login
{
    public readonly record struct LoginResponse(
        bool FirstLogin, 
        UserUpdatedOutbound? User,
        OutboundToken AuthToken
    );
}