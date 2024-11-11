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

        var saveUser = repository.Add(newUser)
            ?? throw new UpsertFailException("User could not be inserted.");;
        await repository.SaveAsync();

        var response = UserCreatedOutbound.Map(saveUser, sector, position);

        return response;
    }
    private static string HashPassword(User user, string raw)
    {
        var hashedPassword = _passwordHasher.HashPassword(user, raw);
        return hashedPassword;
    }

    public async Task<UserUpdatedOutbound> UpdateUser(int id, UserUpdatePayload payload)
    {
        var user = await repository.GetAllNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id) 
            ?? throw new NotFoundException("User not found.");

        if (payload.EDV is not null)
        {
            var exists = await repository.GetAllNoTracking()
                .FirstOrDefaultAsync(u => u.Identification == user.Identification);

            if (exists is not null)
                throw new AlreadyExistsException("EDV already in use.");
        }

        if (payload.SectorId is not null)
        {
            var sector = await sectorRepository.GetAllNoTracking()
                .FirstOrDefaultAsync(u => u.Id == payload.SectorId) 
                ?? throw new NotFoundException("Sector not found.");
            user.SectorId = sector.Id;
        }

        if (payload.PositionId is not null)
        {
            var position = await positionRepository.GetAllNoTracking()
                .FirstOrDefaultAsync(u => u.Id == payload.PositionId) 
                ?? throw new NotFoundException("Position not found.");
            user.PositionId = position.Id;
        }

        if (payload.OccupationId is not null)
        {
            var occupation = await positionRepository.GetAllNoTracking()
                .FirstOrDefaultAsync(u => u.Id == payload.OccupationId) 
                ?? throw new NotFoundException("Occupation not found.");
            user.OccupationId = occupation.Id;
        }

        if (payload.Password is not null)
            user.Hash = HashPassword(user, user.Hash!);

        if (payload.Name is not null)
            user.Name = payload.Name;

        if (payload.Card is not null)
            user.Card = payload.Card;

        if (payload.Birthday is not null)
            user.Birthday = DateTime.Parse(payload.Birthday);

        if (payload.IsActive.HasValue)
            user.NewUser = payload.IsActive.Value;

        if (payload.NewUser.HasValue)
            user.NewUser = payload.NewUser.Value;

        var savedUser =
            repository.Update(user)
            ?? throw new UpsertFailException("User could not be updated.");

        var result = UserUpdatedOutbound.Map(user);

        return result;
    }


}
