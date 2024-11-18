using Api.Core.Errors.Pagination;
using Api.Domain.Services.Pagination;
using Genesis.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Core.Services.Pagination
{
    public class PaginationService : IPaginationService
    {
        public async Task<(IEnumerable<TEntity>, PaginationInfo)> Paginate<TEntity>(
                IQueryable<TEntity> query,
                PaginationOptions pagination)
                where TEntity : IEntity
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