using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Api.Domain.Repositories;

namespace Api.Core.Services;

public class UserService: BaseService<User>, IUserService
{
    private readonly IPositionRepository _positionRepo;
    private readonly ISectorRepository _sectorRepo;
    private readonly IOccupationAreaRepository _areaRepo;
    private readonly PasswordHasher<User> _hasher;

    public UserService( BaseRepository<User> repository, IPositionRepository positionRepository,
    ISectorRepository sectorRepository, IOccupationAreaRepository areaRepository, 
    PasswordHasher<User> hasher) : base(repository)
    {
        _positionRepo = positionRepository;
        _sectorRepo = sectorRepository;
        _areaRepo = areaRepository;
        _hasher = hasher; 
    }

    public async Task<AppResponse<UserDTO>> CreateUser(UserCreatePayload payload)
    {
        var exists = await repository.Get()
            .FirstOrDefaultAsync(u => u.Identification == payload.Identification);

        if (exists is not null)
            throw new AlreadyExistsException("EDV already in use!");

        var position = await _positionRepo.Get()
            .SingleOrDefaultAsync(p => p.Id == payload.PositionId) 
            ?? throw new NotFoundException("Position not found!");
            
        var sector = await _sectorRepo.Get()
            .SingleOrDefaultAsync(s => s.Id == payload.SectorId) 
            ?? throw new NotFoundException("Sector not found!");

        var area = await _areaRepo.Get()
            .SingleOrDefaultAsync(a => a.Id == payload.OccupationAreaId)
            ?? throw new NotFoundException("Area not found");
        
        var newUser = new User(){
            Name = payload.Name,
            Identification = payload.Identification,
            Hash = payload.Identification,
            IsActive = true,
            Position = position,
            Sector = sector,
            OccupationArea = area
        };

        newUser.Hash = _hasher.HashPassword(newUser, newUser.Hash);

        var saveUser = repository.Add(newUser)
            ?? throw new UpsertFailException("User could not be inserted!");
        await repository.SaveAsync();

        return new AppResponse<UserDTO>(
            UserDTO.Map(saveUser),
            "User created successfully!"
        );
    }

    public async Task<AppResponse<UserDTO>> UpdateUser(int id, UserUpdatePayload payload)
    {
        var user = await repository.Get()
            .SingleOrDefaultAsync(u => u.Id == id) 
            ?? throw new NotFoundException("User not found!");

        if (!string.IsNullOrEmpty(payload.Identification))
        {
            var exists = await repository.Get()
                .AnyAsync(u => u.Identification == payload.Identification);

            if (exists)
                throw new AlreadyExistsException("Identification already in use!");

            user.Identification = payload.Identification;
        }

        if (payload.SectorId is not null)
        {
            var sector = await _sectorRepo.Get()
                .SingleOrDefaultAsync(u => u.Id == payload.SectorId) 
                ?? throw new NotFoundException("Sector not found!");

            user.Sector = sector;
        }

        if (payload.PositionId is not null)
        {
            var position = await _positionRepo.Get()
                .SingleOrDefaultAsync(u => u.Id == payload.PositionId) 
                ?? throw new NotFoundException("Position not found!");
            user.Position = position;
        }

        if (payload.OccupationAreaId is not null)
        {
            var area = await _areaRepo.Get()
                .SingleOrDefaultAsync(u => u.Id == payload.OccupationAreaId) 
                ?? throw new NotFoundException("Area not found!");
            user.OccupationArea = area;
        }

        if (!string.IsNullOrEmpty(payload.Password))
            user.Hash = _hasher.HashPassword(user, payload.Password);

        if (!string.IsNullOrEmpty(payload.Name))
            user.Name = payload.Name;

        if (payload.Birthday is not null)
            user.Birthday = payload.Birthday.Value;

        var updatedUser =
            repository.Update(user)
            ?? throw new UpsertFailException("User could not be updated!");

        await repository.SaveAsync();
        return new AppResponse<UserDTO>(
            UserDTO.Map(updatedUser),
            "User updated successfully!"
        );
    }

    public async Task DeleteUser(int id)
    {
        var user = await repository.Get()
            .SingleOrDefaultAsync(u => u.Id == id) 
            ?? throw new NotFoundException("User not found!");

        user.IsActive = false;
        
        // if (user.StudentProfile is not null)
        //     user.StudentProfile.IsActive = false;

        var deletedUser =
            repository.Update(user)
            ?? throw new DeleteFailException("User could not be deleted");

        await repository.SaveAsync();
    }
}