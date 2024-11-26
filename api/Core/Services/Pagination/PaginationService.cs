using Api.Core.Errors.Pagination;
using Api.Domain.Services;
using Genesis.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class PaginationService : IPaginationService
{
    public (IEnumerable<TEntity>, PaginationInfo) Paginate<TEntity>(
        IQueryable<TEntity> query,
        PaginationOptions pagination)
        where TEntity : IEntity
    {
        var totalItems = query.Count();

        if (totalItems <= pagination.Offset)
            throw new PaginationOffsetException("Offset exceeds maximum of items!");

        query = query.Skip(pagination.Offset).Take(pagination.Take);

        var paginationInfo = new PaginationInfo
        {
            Items = totalItems,
            CurrentPage = pagination.Offset / pagination.Take + 1,
            TotalPages = (int)Math.Ceiling((double)totalItems / pagination.Take),
        };

        var data = query.ToList();

        return (data, paginationInfo);
    }

    public async Task<(IEnumerable<TEntity>, PaginationInfo?)> PaginateAsync<TEntity>(
            IQueryable<TEntity> query,
            PaginationOptions pagination)
            where TEntity : IEntity
    {

        PaginationInfo? paginationInfo = null;

        if (pagination.Take != 0)
        {
            var totalItems = await query.CountAsync();

            if (totalItems <= pagination.Offset)
                throw new PaginationOffsetException("Offset exceeds maximum of items!");

            query = query.Skip(pagination.Offset).Take(pagination.Take);

            paginationInfo = new PaginationInfo
            {
                Items = totalItems,
                CurrentPage = pagination.Offset / pagination.Take + 1,
                TotalPages = (int)Math.Ceiling((double)totalItems / pagination.Take),
            };
        }

        var data = await query.ToListAsync();

        return (data, paginationInfo);
    }
}