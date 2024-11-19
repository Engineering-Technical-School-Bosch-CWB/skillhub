namespace Api.Core.Services
{
    public record JwtSettings
    {
        public required string SecretKey { get; init; }
    }
}