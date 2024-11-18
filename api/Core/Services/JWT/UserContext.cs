using Api.Domain.Services;

namespace Api.Core.Services
{
    public readonly record struct ContextData
    {
        public required Guid UserId { get; init; }
        public required string UserName { get; init; }
        public required UsersPositions Position { get; init; }
    }

    public class UserContext
    {
        private ContextData _data;

        public Guid UserId => _data.UserId;
        public string UserName => _data.UserName;
        public UsersPositions Position => _data.Position;

        public void Fill(ContextData data)
        {
            _data = data;
        }
    }
}