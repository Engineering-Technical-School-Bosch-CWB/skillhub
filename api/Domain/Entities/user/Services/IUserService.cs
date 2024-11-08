using Genesis.Domain.Services;
using Api.Domain.Models;
using Api.Core.Repositories;

namespace Api.Domain.Services
{
    public interface IUserService : IService<User>
    {
        public Task<User> GetByIdentification(string identification);
    }
}

