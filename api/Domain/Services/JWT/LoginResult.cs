namespace Api.Domain.Services.JWT;

public abstract record LoginResult()
{
    public record Failed() : LoginResult;
    
    public record Succeeded() : LoginResult
    {
        public required int UserId { get; init; }
        public required string UserName { get; init; }
        public required UsersPositions Position { get; set; }
    };
}
