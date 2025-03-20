namespace Api.Domain.Services
{
    public interface IPaginationService
    {
        (IEnumerable<TEntity>, PaginationInfo?) Paginate<TEntity>(
                IQueryable<TEntity> query,
                PaginationOptions pagination);

        Task<(IEnumerable<TEntity>, PaginationInfo?)> PaginateAsync<TEntity>(
                IQueryable<TEntity> query,
                PaginationOptions pagination);
    }
}