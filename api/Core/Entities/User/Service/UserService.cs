using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Api.Domain.Repositories;
using InvalidDataException = Api.Core.Errors.InvalidDataException;
using Api.Domain.Enums;
using System.Text.RegularExpressions;

namespace Api.Core.Services;

public class UserService(BaseRepository<User> repository, IPositionRepository positionRepository,
    ISectorRepository sectorRepository, IOccupationAreaRepository areaRepository, IStudentService studentService,
    PasswordHasher<User> hasher, IPaginationService paginationService, IClassRepository classRepository,
    IStudentRepository studentRepository
    )   : BaseService<User>(repository), IUserService
{
    private readonly BaseRepository<User> _repo = repository;
    private readonly IPositionRepository _positionRepo = positionRepository;
    private readonly ISectorRepository _sectorRepo = sectorRepository;
    private readonly IOccupationAreaRepository _areaRepo = areaRepository;
    private readonly IClassRepository _classRepo = classRepository;
    private readonly IStudentRepository _studentRepo = studentRepository;
    private readonly PasswordHasher<User> _hasher = hasher;
    private readonly IPaginationService _pagService = paginationService;
    private readonly IStudentService _studentservice = studentService;

    #region CRUD

    public async Task<AppResponse<UserDTO>> CreateUser(UserCreatePayload payload)
    {
        var exists = await _repo.Get()
            .Where(u => u.IsActive)
            .FirstOrDefaultAsync(u => u.Identification == payload.Identification);

        if (exists is not null)
            throw new AlreadyExistsException($"EDV {payload.Identification} already in use!");

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
            Birthday = payload.Birthday,
            IsActive = true,
            Position = position,
            Sector = sector,
            OccupationArea = area,
            ProfilePicture = null
        };

        newUser.Hash = _hasher.HashPassword(newUser, newUser.Hash);

        var savedUser = _repo.Add(newUser)
            ?? throw new UpsertFailException("User could not be inserted!");
        await _repo.SaveAsync();

        return new AppResponse<UserDTO>(
            UserDTO.Map(savedUser),
            "User created successfully!"
        );
    }

    public async Task<AppResponse<UserDTO>> CreateUserByClass(UserCreatePayload payload, int idClass)
    {
        var _class = await _classRepo.Get().SingleOrDefaultAsync(crrClass => crrClass.Id == idClass )
            ?? throw new NotFoundException("Class not Found!");

        var userIfExists = await repository.Get().SingleOrDefaultAsync(u => u.Identification == payload.Identification);
        if(userIfExists is not null)
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
            ?? throw new NotFoundException("Area not found!");
        
        var newUser = new User()
        {
            Name = payload.Name,
            Identification = payload.Identification,
            Hash = payload.Identification,
            Birthday = payload.Birthday,
            IsActive = true,
            Position = position,
            Sector = sector,
            OccupationArea = area,
            ProfilePicture = null
        };

        newUser.Hash = _hasher.HashPassword(newUser, newUser.Hash);

        var savedUser = _repo.Add(newUser)
            ?? throw new UpsertFailException("User could not be inserted!");
        await _repo.SaveAsync();

        var savedStudent = _studentRepo.Add(new (){
            Class = _class,
            User = savedUser
        }) ?? throw new UpsertFailException("User could not be inserted!");

        await _studentRepo.SaveAsync();
        return new AppResponse<UserDTO>(
            UserDTO.Map(savedUser),
            "User created successfully!"
        );
    }

    public async Task<AppResponse<UserDTO>> UpdateUser(int id, UserUpdatePayload payload, UserContext userContext)
    {
        var user = await _repo.Get()
            .Include(u => u.Position)
            .Include(u => u.Sector)
            .Include(u => u.OccupationArea)
            .Include(u => u.ProfilePicture)
            .SingleOrDefaultAsync(u => u.Id == id)
            ?? throw new NotFoundException("User not found!");

        if (payload.ClassId is not null) 
        {
            if(userContext.PermissionLevel < EPermissionLevel.Admin)
                throw new UnauthorizedAccessException("User can't be modify class");
            var _student = await _studentRepo.Get()
                .Where(s => s.IsActive)
                .Include(s => s.Class)
                .SingleOrDefaultAsync(s => s.User.Id == id);

            var _class = await _classRepo.Get()
                .Where(c => c.IsActive)
                .FirstOrDefaultAsync(c => c.Id == payload.ClassId)
                    ?? throw new NotFoundException("Class not found!");

            if (_student is null)
            {
                _student = new(){
                    Class = _class,
                    User = user,
                };
                _studentRepo.Add(_student);
            } else {
                _student.Class = _class;
                _studentRepo.Update(_student);
            }
        }

        if (!string.IsNullOrEmpty(payload.Identification))
        {
            if(userContext.PermissionLevel < EPermissionLevel.Admin)
                throw new UnauthorizedAccessException("User can't be modify class");
            var exists = await _repo.Get()
                .AnyAsync(u => u.Identification == payload.Identification);

            if (exists)
                throw new AlreadyExistsException("Identification already in use!");
            
            string pattern = @"^\d{8}$";
            Regex regex = new Regex(pattern);
            bool isValid = regex.IsMatch(payload.Identification);
            if(!isValid)
                throw new InvalidDataException("Invalid identification");

            user.Identification = payload.Identification;
        }

        if (payload.SectorId is not null)
        {
            if(userContext.PermissionLevel < EPermissionLevel.Admin)
                throw new UnauthorizedAccessException("User can't be modify sector");
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
            if(userContext.PermissionLevel < EPermissionLevel.Admin)
                throw new UnauthorizedAccessException("User can't be modify occupation area");
            var area = await _areaRepo.Get()
                .SingleOrDefaultAsync(u => u.Id == payload.OccupationAreaId)
                ?? throw new NotFoundException("Area not found!");
            user.OccupationArea = area;
        }

        if (!string.IsNullOrEmpty(payload.Password))
        {
            if (payload.Password == user.Identification )
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
            .Include(u => u.ProfilePicture)
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
                .Include(u => u.ProfilePicture)
                .Where(u => string.IsNullOrEmpty(query) || EF.Functions.Like(u.Name, $"%{query}%"))
                .Where(u => !positionId.HasValue || u.Position.Id == positionId)
                .Where(u => !birthMonth.HasValue || (u.Birthday.HasValue && u.Birthday.Value.Month == birthMonth.Value))
                .Where(u => u.IsActive),
            pagination.ToOptions()
        );

        var mappedUsers = new List<UserDTO>();

        foreach (var u in result.Item1)
            mappedUsers.Add(UserDTO.Map(u, await _studentservice.GetByUserId(u.Id)));

        if (classId is not null)
            mappedUsers = [.. mappedUsers.Where(u => u.StudentProfile?.ClassId == classId)];

        return new PaginatedAppResponse<UserDTO>(
            mappedUsers,
            result.Item2!,
            "Users found!"
        );
    }

    #endregion

    #region Services

    public async Task<IEnumerable<ObjectDTO>> GetTeachers(User? instructor = null)
    {
        var teachers = await _repo.Get()
            .Where(u => u.IsActive)
            .Include(u => u.ProfilePicture)
            .Where(u => (EPositionType)u.Position.PositionType == EPositionType.Teacher)
            .Where(u => instructor == null || u.Id != instructor.Id)
            .OrderBy(u => u.Name)
            .Select(u => ObjectDTO.Map(u.Id, u.Name))
            .ToListAsync();

        if (instructor is not null)
            teachers = [ObjectDTO.Map(instructor.Id, instructor.Name), ..teachers];

        return teachers;
    }

    public async Task ArchiveUser(int id)
    {
        var user = await repository.Get()
            .SingleOrDefaultAsync(u => u.IsActive && u.Id == id)
                ?? throw new NotFoundException("User not found!");
        
        user.IsArchived = !user.IsArchived;
        repository.Update(user);
        await repository.SaveAsync();
    }
    
    #endregion

    #region Pages

    public async Task<AppResponse<UserProfileDTO>> GetUserProfile(int? id, int loggedId)
    {
        var userId = id ?? loggedId;

        var user = await _repo.Get()
            .Where(u => u.IsActive)
            .Include(u => u.Position)
            .Include(u => u.Sector)
            .Include(u => u.ProfilePicture)
            .SingleOrDefaultAsync(u => u.Id == userId)
            ?? throw new NotFoundException("User not found!");

        return new AppResponse<UserProfileDTO>(
            UserProfileDTO.Map(user, await _studentservice.GetStudentProfile(userId, id.HasValue && id.Value != loggedId)),
            "User found!"
        );
    }

    public async Task<PaginatedAppResponse<UserDTO>> GetBirthdays(PaginationQuery pagination, short month)
    {
        var result = await _pagService.PaginateAsync(
            _repo.GetAllNoTracking()
                .Include(u => u.Position)
                .Include(u => u.Sector)
                .Include(u => u.OccupationArea)
                .Include(u => u.ProfilePicture)
                .Where(u => u.Birthday.HasValue && u.Birthday.Value.Month == month)
                .Where(u => u.IsActive)
                .Where(u => !u.IsArchived),
            pagination.ToOptions()
        );

        var mappedUsers = new List<UserDTO>();

        foreach (var u in result.Item1)
            mappedUsers.Add(UserDTO.Map(u, await _studentservice.GetByUserId(u.Id)));

        mappedUsers = mappedUsers.Select(u => {
            return new UserDTO(0,u.Name, null, u.Birthday, u.Position, u.Sector, u.OccupationArea, null, null, false, u.ProfilePicture);
        }).ToList();

        return new PaginatedAppResponse<UserDTO>(
            mappedUsers,
            result.Item2!,
            "Users found!"
        );
    }

    #endregion
}
