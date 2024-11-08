using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Api.Domain.JWTService;
using System.Text;
using core.Data;
using core.Data.Contexts;
using core.Data.Outbound;
using core.Errors;
using core.Models;
using Microsoft.IdentityModel.Tokens;

namespace core.Services
{
    public class JwtService : IJwtService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly SymmetricSecurityKey _securityKey;
        private readonly SigningCredentials _credentials;
        private readonly UserContext _userContext;

        public JwtService(
            IServiceProvider serviceProvider,
            JwtSettings jwtSettings,
            JwtSecurityTokenHandler tokenHandler,
            UserContext userContext)
        {
            _serviceProvider = serviceProvider;
            _tokenHandler = tokenHandler;
            _userContext = userContext;

            _securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey));
            _credentials = new SigningCredentials(_securityKey, SecurityAlgorithms.HmacSha512);
        }

        public OutboundToken GenerateToken(LoginResult.Succeeded auth)
        {
            var claims = new List<Claim>
            {
                new("UserId", auth.UserId.ToString()),
                new("UserName", auth.UserName),
            };

            var SecToken = new JwtSecurityToken(
                "Project-E",
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
                            ValidIssuer = "Project-E",
                            IssuerSigningKey = _securityKey
                        },
                        out var validatedToken);
            }
            catch (Exception ex)
            {
                throw new InvalidTokenException("Unable to validate token and its claims.", ex);
            }
            
            _userContext.Fill(new ContextData
            {
                UserId = Guid.Parse(claims.FindFirst("UserId")!.Value),
                UserName = claims.FindFirst("UserName")!.Value,
            });
        }
    }
}