using Genesis.Domain.Models;

namespace Api.Domain.Services
{
    public interface IPaginationService
    {
        (IEnumerable<TEntity>, PaginationInfo) Paginate<TEntity>(
                IQueryable<TEntity> query,
                PaginationOptions pagination)
            where TEntity : IEntity;

        Task<(IEnumerable<TEntity>, PaginationInfo)> PaginateAsync<TEntity>(
                IQueryable<TEntity> query,
                PaginationOptions pagination)
            where TEntity : IEntity;
    }
}