namespace Api.Core.JWTService
{
    public record JwtSettings
    {
        public required string SecretKey { get; init; }
    }
}