using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Api.Domain.Repositories;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Api.Core.Services;

public class UserService(
    BaseRepository<User> repository,
    IPositionRepository positionRepository,
    ISectorRepository sectorRepository,
    IOccupationAreaRepository areaRepository
    ) : BaseService<User>(repository), 
    IUserService
{
    private readonly IPositionRepository _positionRepo = positionRepository;
    private readonly ISectorRepository _sectorRepo = sectorRepository;
    private readonly IOccupationAreaRepository _areaRepo = areaRepository;
    private static readonly PasswordHasher<User> _passwordHasher = new();

    public async Task<UserCreatedOutbound> CreateUser(UserCreatePayload payload)
    {
        var exists = await repository.GetAllNoTracking()
            .FirstOrDefaultAsync(u => u.Identification == payload.EDV);

        if (exists is not null)
            throw new AlreadyExistsException("EDV already in use.");

        var position = await _positionRepo.GetAllNoTracking()
            .SingleOrDefaultAsync(p => p.Id == payload.PositionId) 
            ?? throw new NotFoundException("Position not found.");
            
        var sector = await _sectorRepo.GetAllNoTracking()
            .SingleOrDefaultAsync(s => s.Id == payload.SectorId) 
            ?? throw new NotFoundException("Sector not found.");

        var area = await _areaRepo.GetAllNoTracking()
            .SingleOrDefaultAsync(a => a.Id == payload.AreaId)
            ?? throw new NotFoundException("Area not found");
        
        var newUser = new User(){
            Name = payload.Name,
            Identification = payload.EDV,
            Hash = payload.EDV,
            IsActive = true,
            Position = position,
            Sector = sector,
            Area = area
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
            .SingleOrDefaultAsync(u => u.Id == id) 
            ?? throw new NotFoundException("User not found.");

        if (payload.EDV is not null)
        {
            var exists = await repository.GetAllNoTracking()
                .SingleOrDefaultAsync(u => u.Identification == user.Identification);

            if (exists is not null)
                throw new AlreadyExistsException("EDV already in use.");
        }

        if (payload.SectorId is not null)
        {
            var sector = await _sectorRepo.GetAllNoTracking()
                .SingleOrDefaultAsync(u => u.Id == payload.SectorId) 
                ?? throw new NotFoundException("Sector not found.");

            user.Sector = sector;
        }

        if (payload.PositionId is not null)
        {
            var position = await _positionRepo.GetAllNoTracking()
                .SingleOrDefaultAsync(u => u.Id == payload.PositionId) 
                ?? throw new NotFoundException("Position not found.");
            user.Position = position;
        }

        if (payload.OccupationId is not null)
        {
            var area = await _areaRepo.GetAllNoTracking()
                .SingleOrDefaultAsync(u => u.Id == payload.OccupationId) 
                ?? throw new NotFoundException("Area not found.");
            user.Area = area;
        }

        if (payload.Password is not null)
            user.Hash = HashPassword(user, user.Hash!);

        if (payload.Name is not null)
            user.Name = payload.Name;

        if (payload.Birthday is not null)
            user.Birthday = DateTime.Parse(payload.Birthday);

        var savedUser =
            repository.Update(user)
            ?? throw new UpsertFailException("User could not be updated.");

        var result = UserUpdatedOutbound.Map(user);

        return result;
    }

    public async Task DeleteUser(int id)
    {
        var user = await repository.GetAllNoTracking()
            .SingleOrDefaultAsync(u => u.Id == id) 
            ?? throw new NotFoundException("User not found.");

        user.IsActive = false;
        
        if (user.StudentProfile is not null)
            user.StudentProfile.IsActive = false;

        var deletedUser =
            repository.Update(user)
            ?? throw new DeleteFailException("User could not be deleted");

    }
}