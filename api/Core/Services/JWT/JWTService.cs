using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Api.Core.Errors.JWTService;
using System.Security.Claims;
using Api.Domain.Services;
using System.Text;
using Api.Core.Services;

namespace Api.Core.Services
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

        public OutboundToken GenerateToken(LoginResult.Succeeded auth)
        {
            var claims = new List<Claim>
            {
                new("UserId", auth.UserId.ToString()),
                new("UserName", auth.UserName),
                new("Position", auth.Position.ToString())
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

            var userPosition = claims.FindFirst("Position")!.Value;
            
            _userContext.Fill(new ContextData
            {
                UserId = Guid.Parse(claims.FindFirst("UserId")!.Value),
                UserName = claims.FindFirst("UserName")!.Value,
                Position = userPosition switch
                {
                    "STUDENT" => UsersPositions.STUDENT,
                    "INSTRUCTOR" => UsersPositions.INSTRUCTOR,
                    _ => UsersPositions.SUBOFFICER,
                }
            });
        }
    }
}