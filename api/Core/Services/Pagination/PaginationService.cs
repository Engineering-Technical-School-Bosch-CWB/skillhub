using Api.Core.Errors.Pagination;
using Api.Domain.Services;
using Genesis.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;

public class PaginationService : IPaginationService
{
    public (IEnumerable<TEntity>, PaginationInfo?) Paginate<TEntity>(
        IQueryable<TEntity> query,
        PaginationOptions pagination)
        where TEntity : IEntity
    {
        PaginationInfo? paginationInfo = null;

        if (pagination.Take != 0)
        {
            var totalItems = query.Count();

            if (totalItems < pagination.Offset)
                throw new PaginationOffsetException("Offset exceeds maximum of items!");

            query = query.Skip(pagination.Offset).Take(pagination.Take);

            paginationInfo = new PaginationInfo
            {
                Items = totalItems,
                CurrentPage = pagination.Offset / pagination.Take + 1,
                TotalPages = (int)Math.Ceiling((double)totalItems / pagination.Take),
            };
        }
        var data = query.ToList();

        return (data, paginationInfo);
    }

    /// <summary>
    /// Paginates a queryable dataset and returns the paginated data along with pagination metadata.
    /// </summary>
    /// <typeparam name="TEntity">The type of the entities being paginated, which must implement <see cref="IEntity"/>.</typeparam>
    /// <param name="query">
    /// The queryable dataset to paginate. <br/>
    /// The dataset must be an <see cref="IQueryable{TEntity}"/> representing the source of data.
    /// </param>
    /// <param name="pagination">
    /// The pagination options, including the number of items to retrieve (<c>Take</c>) and the offset of the first item (<c>Offset</c>).
    /// </param>
    /// <returns>
    /// A tuple containing:<br/>
    /// - An <see cref="IEnumerable{TEntity}"/> containing the paginated data.<br/>
    /// - A <see cref="PaginationInfo"/> object with metadata about the pagination, such as the total number of items, 
    /// the current page, and the total number of pages.
    /// </returns>
    /// <exception cref="PaginationOffsetException">
    /// Thrown if the pagination offset exceeds the total number of items in the dataset.
    /// </exception>
    /// <remarks>
    /// - If the <paramref name="pagination"/> specifies a <c>Take</c> value of 0, no pagination is applied, and all items are returned.<br/>
    /// - The metadata in <see cref="PaginationInfo"/> is calculated only if pagination is applied.<br/>
    /// - The method uses Entity Framework's <c>ToListAsync</c> to materialize the data from the query.
    /// </remarks>

    public async Task<(IEnumerable<TEntity>, PaginationInfo?)> PaginateAsync<TEntity>(
            IQueryable<TEntity> query,
            PaginationOptions pagination)
            where TEntity : IEntity
    {

        PaginationInfo? paginationInfo = null;

        if (pagination.Take != 0)
        {
            var totalItems = await query.CountAsync();

            if (totalItems < pagination.Offset)
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