using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

using Api.Core.Errors.JWTService;
using Api.Domain.Services;
using Api.Domain.Models;
using Api.Domain.Enums;

namespace Api.Core.Services;
public class JwtService : IJwtService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly JwtSecurityTokenHandler _tokenHandler;
    private readonly SymmetricSecurityKey _securityKey;
    private readonly SigningCredentials _credentials;
    private readonly UserContext _userContext;

    public JwtService(
        IServiceProvider serviceProvider,
        JwtSecurityTokenHandler tokenHandler,
        UserContext userContext,
        JwtSettings settings)
    {
        _serviceProvider = serviceProvider;
        _tokenHandler = tokenHandler;
        _userContext = userContext;

        _securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.SecretKey));

        _credentials = new SigningCredentials(_securityKey, SecurityAlgorithms.HmacSha512);
    }

    public OutboundToken GenerateToken(UserDTO user)
    {
        var claims = new List<Claim>
            {
                new("UserId", user.Id.ToString()),
                new("Name", user.Name),
                new("PermissionLevel", Enum.GetName(typeof(EPermissionLevel), user.PermissionLevel!)!)
            };

        var SecToken = new JwtSecurityToken(
            "SkillHub",
            audience: null,
            claims: claims,
            expires: DateTime.Now.AddHours(8),
            signingCredentials: _credentials);

        var token = _tokenHandler.WriteToken(SecToken);

        return new OutboundToken(token);
    }

    public void ValidateToken(string jwt)
    {
        ClaimsPrincipal? claims;

        try
        {
            claims = _tokenHandler.ValidateToken(jwt,
                    new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = false,
                        ValidIssuer = "SkillHub",
                        IssuerSigningKey = _securityKey
                    },
                    out var validatedToken);
        }
        catch (Exception ex)
        {
            throw new InvalidTokenException("Unable to validate token and its claims.", ex);
        }

        var userPosition = claims.FindFirst("PermissionLevel")!.Value;

        _userContext.Fill(new ContextData
        {
            UserId = int.Parse(claims.FindFirst("UserId")!.Value),
            Name = claims.FindFirst("Name")!.Value,
            PermissionLevel = Enum.Parse<EPermissionLevel>(userPosition)
        });
    }
}