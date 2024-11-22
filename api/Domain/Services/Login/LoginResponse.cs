using Api.Domain.Models;

namespace Api.Domain.Services;
public readonly record struct LoginResponse(
    bool FirstLogin, 
    UserDTO? User,
    OutboundToken AuthToken
);