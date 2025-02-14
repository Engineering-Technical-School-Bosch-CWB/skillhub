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

public class StudentResultService(BaseRepository<User> repository, IPositionRepository positionRepository,
    ISectorRepository sectorRepository, IOccupationAreaRepository areaRepository, IStudentService studentService,
    PasswordHasher<User> hasher, IPaginationService paginationService) : BaseService<User>(repository), IStudentResultService
{
    private readonly BaseRepository<User> _repo = repository;
    private readonly IPositionRepository _positionRepo = positionRepository;
    private readonly ISectorRepository _sectorRepo = sectorRepository;
    private readonly IOccupationAreaRepository _areaRepo = areaRepository;

    private readonly PasswordHasher<User> _hasher = hasher;
    private readonly IPaginationService _pagService = paginationService;
    private readonly IStudentService _studentservice = studentService;

    #region CRUD

    #endregion

    #region Pages

    #endregion
}
