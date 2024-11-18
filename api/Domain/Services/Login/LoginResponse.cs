using Api.Domain.Models;
using Api.Domain.Services;

namespace Api.Domain.Services;
public readonly record struct LoginResponse(
    bool FirstLogin, 
    UserUpdatedOutbound? User,
    OutboundToken AuthToken
);