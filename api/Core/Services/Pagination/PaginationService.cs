using api.Core.Errors.Pagination;
using api.Domain.Services.Pagination;
using Microsoft.EntityFrameworkCore;

namespace api.Core.Services.Pagination
{
    public class PaginationService : IPaginationService
    {
        public async Task<(IEnumerable<TEntity>, PaginationInfo)> Paginate<TEntity>(
                IQueryable<TEntity> query,
                PaginationOptions pagination)
        {
            var totalItems = await query.CountAsync();

            if (totalItems <= pagination.Offset)
                throw new PaginationOffsetException("Offset exceeds maximum of items.");

            query = query.Skip(pagination.Offset).Take(pagination.Take);

            var paginationInfo = new PaginationInfo
            {
                Items = totalItems,
                CurrentPage = pagination.Offset / pagination.Take + 1,
                TotalPages = (int)Math.Ceiling((double)totalItems / pagination.Take),
            };

            var data = await query.ToListAsync();

            return (data, paginationInfo);
        }
    }
}