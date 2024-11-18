namespace Api.Domain.Services
{
    public readonly record struct PaginationOptions
    {
        public required int Offset { get; init; }
        public required int Take { get; init; }
    }
}