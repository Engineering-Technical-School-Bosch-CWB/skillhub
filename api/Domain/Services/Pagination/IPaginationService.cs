using Genesis.Domain.Models;

namespace Api.Domain.Services
{
    public interface IPaginationService
    {
        Task<(IEnumerable<TEntity>, PaginationInfo)> Paginate<TEntity>(
                IQueryable<TEntity> query,
                PaginationOptions pagination)
                where TEntity : IEntity;

    }
}