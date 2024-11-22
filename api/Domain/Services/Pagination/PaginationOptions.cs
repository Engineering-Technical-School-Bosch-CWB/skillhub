namespace Api.Domain.Services
{
    public readonly record struct PaginationQuery
    {
        public required int Page { get; init; }
        public required int Items { get; init; }

        public PaginationOptions ToOptions()
        {
            return new PaginationOptions()
            {
                Offset = (Page - 1) * Items,
                Take = Items,
            };
        }
    }

    public readonly record struct PaginationOptions
    {
        public required int Offset { get; init; }
        public required int Take { get; init; }
    }
}