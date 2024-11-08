namespace Api.Domain.JWTService
{
    public abstract record LoginResult()
    {
        public record Failed() : LoginResult;
        
        public record Succeeded() : LoginResult
        {
            public required Guid UserId { get; init; }
            public required string UserName { get; init; }
        };
    }
}