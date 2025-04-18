using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Attributes;
using Api.Domain.Enums;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("SkillHub/api/v1/users")]
public class UserController : ControllerBase
{

    #region CRUD

    [HttpPost]
    public async Task<ActionResult> CreateUser(
        [FromServices] IUserService service, [FromServices] IPermissionService permissionService,
        [FromBody] UserCreatePayload payload
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.CreateUser(payload);
        return Created("/api/v1/users", result);
    }
    [HttpPost]
    [Route("byClass/{id}")]
    public async Task<ActionResult> AddStudentByClass(
        [FromServices] IUserService service,
        [FromBody] UserCreatePayload payload,
        int id
    )
    {
        var result = await service.CreateUserByClass(payload, id);
        return Ok(result);
    }

    [HttpGet]
    [Route("teachers")]
    public async Task<ActionResult> GetTeachers(
        [FromServices] IUserService service, [FromServices] IPermissionService permissionService,
        ISubjectRepository subjectRepository, IExamRepository examRepository, [FromQuery] int? subjectId, [FromQuery] int? examId
    )
    {
        permissionService.ValidateAdmPermission();

        User? instructor = null;

        if (subjectId.HasValue)
        {
            var subject = await subjectRepository.Get()
                .Where(s => s.IsActive && s.Id == subjectId.Value)
                .Include(s => s.Instructor)
                .SingleOrDefaultAsync() ?? throw new NotFoundException("Subject not found!");

            instructor = subject.Instructor;
        }

        else if (examId.HasValue)
        {
            var exam = await examRepository.Get()
                .Where(e => e.IsActive && e.Id == examId.Value)
                .Include(e => e.Instructor)
                .SingleOrDefaultAsync() ?? throw new NotFoundException("Exam not found!");

            instructor = exam.Instructor;
        }

        var result = await service.GetTeachers(instructor);
        return Ok(new { data = result });
    }

    [HttpPatch]
    [Route("{id}")]
    [StudentCanBeAccess]
    public async Task<ActionResult> UpdateUser(
        [FromServices] IUserService service,
        [FromServices] UserContext userContext,
        [FromBody] UserUpdatePayload payload, int id
    )
    {
        var result = await service.UpdateUser(id, payload, userContext);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteUser(
        [FromServices] IUserService service, [FromServices] IPermissionService permissionService,
        int id
    )
    {
        permissionService.ValidateAdmPermission();

        await service.DeleteUser(id);
        return NoContent();
    }

    [HttpGet]
    [StudentCanBeAccess]
    public async Task<IActionResult> GetUser(
        [FromServices] IUserService service, UserContext userContext,
        [FromQuery] int? id
    )
    {
        var result = await service.GetUser(id ?? userContext.UserId);
        return Ok(result);
    }

    [HttpGet]
    [Route("paginated")]
    public async Task<ActionResult> GetPaginatedUsers(
        [FromServices] IPermissionService permissionService,
        [FromServices] IUserService service, [FromQuery] PaginationQuery pagination,
        [FromQuery] string? query, [FromQuery] short? birthMonth,
        [FromQuery] int? positionId, [FromQuery] int? classId
    )
    {
        permissionService.ValidateAdmPermission();
        var result = await service.GetPaginatedUsers(pagination, query, birthMonth, positionId, classId);
        return Ok(result);
    }

    #endregion

    #region Services

    [HttpGet]
    [Route("profile")]
    public async Task<ActionResult> GetUserProfile(
        [FromServices] IUserService service, UserContext userContext, [FromQuery] int? id
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin && id.HasValue && id.Value != userContext.UserId)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.GetUserProfile(id, userContext.UserId);
        return Ok(result);
    }

    [HttpPatch]
    [Route("archive/{userId}")]
    public async Task<ActionResult> ArchiveUser(
        UserContext userContext,
        [FromServices] IUserService service,
        int userId
    ) {
        if (userContext.PermissionLevel != EPermissionLevel.Admin && userId != userContext.UserId)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        await service.ArchiveUser(userId);
        return Ok();
    }

    [HttpGet]
    [Route("birthdays")]
    public async Task<ActionResult> GetBirthdays(
        [FromQuery] PaginationQuery pagination,
        [FromServices] IUserService service,
        [FromQuery] short birthMonth
    ){
        var response = await service.GetBirthdays(pagination, birthMonth);
        return Ok(response);
    }

    #endregion

    #region User Image

    [HttpPost("image/{userId}")]
    public async Task<ActionResult> UploadProfileImage(
        [FromServices] IImageService service,
        IFormFile file,
        int userId
    ){
        System.Console.WriteLine(file.Name);
        await service.UploadUserProfileImage(file, userId);
        return Ok();
    }
    #endregion
}