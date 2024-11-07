using Genesis.Domain.Models;

namespace api.Domain.Services.Pagination
{
    public interface IPaginationService
    {
        Task<(IEnumerable<TEntity>, PaginationInfo)> Paginate<TEntity>(
                IQueryable<TEntity> query,
                PaginationOptions pagination)
                where TEntity : IEntity;

    }
}