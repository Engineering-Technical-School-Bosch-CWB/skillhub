namespace Api.Core.Services.JWT
{
    public record JwtSettings
    {
        public required string SecretKey { get; init; }
    }
}