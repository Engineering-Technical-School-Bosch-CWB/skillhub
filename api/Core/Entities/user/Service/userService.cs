using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Api.Core.Services;

public class UserService(
    BaseRepository<User> repository,
    BaseRepository<Position> positionRepository,
    BaseRepository<Sector> sectorRepository
    ) : BaseService<User>(repository), 
    IUserService
{
    private static readonly PasswordHasher<User> _passwordHasher = new();

    public async Task<UserCreatedOutbound> CreateUser(UserCreatePayload payload)
    {
        var exists = await repository.GetAllNoTracking()
            .FirstOrDefaultAsync(u => u.Identification == payload.EDV);

        if ( exists is not null )
            throw new AlreadyExistsException("EDV already in use.");

        var position = await positionRepository.GetAllNoTracking()
            .FirstOrDefaultAsync(p => p.Id == payload.PositionId) 
            ?? throw new NotFoundException("Position not found.");
            
        var sector = await sectorRepository.GetAllNoTracking()
            .FirstOrDefaultAsync(s => s.Id == payload.SectorId) 
            ?? throw new NotFoundException("Sector not found.");
        
        var newUser = new User(){
            Name = payload.Name,
            Identification = payload.EDV,
            Hash = payload.EDV,
            IsActive = true,
            NewUser = true,
            PositionId = payload.PositionId,
            SectorId = payload.SectorId,
        };
        newUser.Hash = HashPassword(newUser, newUser.Hash);

        var saveUser = repository.Add(newUser);
        await repository.SaveAsync();

        var response = new UserCreatedOutbound(){
            UserId = saveUser.Id,
            Position = position.Name,
            Sector = sector.Name
        };

        return response;
    }
    private static string HashPassword(User user, string raw)
    {
        var hashedPassword = _passwordHasher.HashPassword(user, raw);
        return hashedPassword;
    }

    public async Task<UserUpdatedOutbound> UpdateUser(int id, UserUpdatePayload payload)
    {
        await repository.SaveAsync();
        var response = new UserUpdatedOutbound();
        return response;
    }

}
