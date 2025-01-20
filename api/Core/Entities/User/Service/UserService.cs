using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Api.Domain.Repositories;
using InvalidDataException = Api.Core.Errors.InvalidDataException;

namespace Api.Core.Services;

public class UserService(BaseRepository<User> repository, IPositionRepository positionRepository,
    ISectorRepository sectorRepository, IOccupationAreaRepository areaRepository, IStudentService studentService,
    PasswordHasher<User> hasher, IPaginationService paginationService) : BaseService<User>(repository), IUserService
{
    private readonly BaseRepository<User> _repo = repository;
    private readonly IPositionRepository _positionRepo = positionRepository;
    private readonly ISectorRepository _sectorRepo = sectorRepository;
    private readonly IOccupationAreaRepository _areaRepo = areaRepository;
    private readonly PasswordHasher<User> _hasher = hasher;
    private readonly IPaginationService _pagService = paginationService;
    private readonly IStudentService _studentservice = studentService;

    public async Task<AppResponse<UserDTO>> CreateUser(UserCreatePayload payload)
    {
        var exists = await _repo.Get()
            .Where(u => u.IsActive)
            .FirstOrDefaultAsync(u => u.Identification == payload.Identification);

        if (exists is not null)
            throw new AlreadyExistsException("EDV already in use!");

        var position = await _positionRepo.Get()
            .Where(p => p.IsActive)
            .SingleOrDefaultAsync(p => p.Id == payload.PositionId)
            ?? throw new NotFoundException("Position not found!");

        var sector = await _sectorRepo.Get()
            .Where(s => s.IsActive)
            .SingleOrDefaultAsync(s => s.Id == payload.SectorId)
            ?? throw new NotFoundException("Sector not found!");

        var area = await _areaRepo.Get()
            .Where(a => a.IsActive)
            .SingleOrDefaultAsync(a => a.Id == payload.OccupationAreaId)
            ?? throw new NotFoundException("Area not found");

        var newUser = new User()
        {
            Name = payload.Name,
            Identification = payload.Identification,
            Hash = payload.Identification,
            IsActive = true,
            Position = position,
            Sector = sector,
            OccupationArea = area
        };

        newUser.Hash = _hasher.HashPassword(newUser, newUser.Hash);

        var saveUser = _repo.Add(newUser)
            ?? throw new UpsertFailException("User could not be inserted!");
        await _repo.SaveAsync();

        return new AppResponse<UserDTO>(
            UserDTO.Map(saveUser, null),
            "User created successfully!"
        );
    }

    public async Task<AppResponse<UserDTO>> UpdateUser(UserUpdatePayload payload)
    {
        var user = await _repo.Get()
            .Include(u => u.Position)
            .Include(u => u.Sector)
            .Include(u => u.OccupationArea)
            .SingleOrDefaultAsync(u => u.Id == payload.UserId)
            ?? throw new NotFoundException("User not found!");

        if (!string.IsNullOrEmpty(payload.Identification))
        {
            var exists = await _repo.Get()
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
        {
            if (payload.Password == user.Identification)
            {
                throw new InvalidDataException("Invalid password!");
            }
            user.Hash = _hasher.HashPassword(user, payload.Password);
        }

        if (!string.IsNullOrEmpty(payload.Name))
            user.Name = payload.Name;

        if (payload.Birthday.HasValue)
            user.Birthday = payload.Birthday.Value;

        var updatedUser =
            _repo.Update(user)
            ?? throw new UpsertFailException("User could not be updated!");

        await _repo.SaveAsync();

        var student = await _studentservice.GetByUserId(updatedUser.Id);

        return new AppResponse<UserDTO>(
            UserDTO.Map(updatedUser, student),
            "User updated successfully!"
        );
    }

    public async Task DeleteUser(int id)
    {
        var user = await _repo.Get()
            .SingleOrDefaultAsync(u => u.Id == id)
            ?? throw new NotFoundException("User not found!");

        user.IsActive = false;

        // if (user.StudentProfile is not null)
        //     user.StudentProfile.IsActive = false;

        var deletedUser =
            _repo.Update(user)
            ?? throw new DeleteFailException("User could not be deleted");

        await _repo.SaveAsync();
    }

    public async Task<AppResponse<UserDTO>> GetUser(int id)
    {
        var user = await _repo.GetAllNoTracking()
            .Include(u => u.Position)
            .Include(u => u.Sector)
            .Include(u => u.OccupationArea)
            .SingleOrDefaultAsync(u => u.Id == id)
            ?? throw new NotFoundException("User not found!");

        var student = await _studentservice.GetByUserId(id);

        return new AppResponse<UserDTO>(
            UserDTO.Map(user, student),
            "User found!"
        );
    }

    /// <summary>
    /// Retrieves a paginated list of users, with optional filtering by name and birth month.
    /// </summary>
    /// <param name="pagination">Pagination parameters, including page number and size.</param>
    /// <param name="query">
    /// A search term to filter users by their name. <br/>
    /// If null or empty, no filtering by name is applied.
    /// </param>
    /// <param name="birthMonth">
    /// The month (1 to 12) to filter users by their birthday.<br/>
    /// If null, no filtering by birth month is applied.
    /// </param>
    /// <returns>
    /// A paginated response containing a list of users that match the specified filters
    /// and pagination metadata.
    /// </returns>
    /// <remarks>
    /// - This method uses eager loading to include related entities (Position, Sector, and OccupationArea).<br/>
    /// - If both <paramref name="query"/> and <paramref name="birthMonth"/> are null, all users are returned.<br/>
    /// - Pagination is handled by the <c>IPaginationService.PaginateAsync</c> method.
    /// </remarks>
    public async Task<PaginatedAppResponse<UserDTO>> GetPaginatedUsers(PaginationQuery pagination, string? query, short? birthMonth, int? positionId, int? classId)
    {
        var result = await _pagService.PaginateAsync(
            _repo.GetAllNoTracking()
                .Include(u => u.Position)
                .Include(u => u.Sector)
                .Include(u => u.OccupationArea)
                .Where(u => string.IsNullOrEmpty(query) || u.Name.Contains(query))
                .Where(u => !positionId.HasValue || u.Position.Id == positionId)
                .Where(u => !birthMonth.HasValue || (u.Birthday.HasValue && u.Birthday.Value.Month == birthMonth.Value))
                .Where(u => u.IsActive),
            pagination.ToOptions()
        );

        var mappedUsers = new List<UserDTO>();

        foreach (var u in result.Item1)
            mappedUsers.Add(UserDTO.Map(u, await _studentservice.GetByUserId(u.Id)));

        if (classId is not null)
            mappedUsers = mappedUsers.Where(u => u.StudentProfile?.ClassId == classId).ToList();

        return new PaginatedAppResponse<UserDTO>(
            mappedUsers,
            result.Item2!,
            "Users found!"
        );
    }

}
