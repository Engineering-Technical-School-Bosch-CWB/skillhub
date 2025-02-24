using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Enums;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/users")]
public class UserController : ControllerBase
{
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
    ){
        System.Console.WriteLine(id);
        var result = await service.CreateUserByClass(payload, id);
        return Ok(result);
    }

    [HttpGet]
    [Route("teachers")]
    public async Task<ActionResult> GetTeachers(
        [FromServices] IUserService service, [FromServices] IPermissionService permissionService,
        ISubjectRepository subjectRepository, [FromQuery] int? subjectId
    )
    {
        permissionService.ValidateAdmPermission();

        var subject = subjectId.HasValue
            ? await subjectRepository.Get()
                .Where(s => s.IsActive && s.Id == subjectId.Value)
                .Include(s => s.Instructor)
                .SingleOrDefaultAsync() ?? throw new NotFoundException("Subject not found!")
            : null;

        var result = await service.GetTeachers(subject?.Instructor);
        return Ok(new { data = result });
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> UpdateUser(
        [FromServices] IUserService service,
        [FromBody] UserUpdatePayload payload, int id
    )
    {
        var result = await service.UpdateUser(id, payload);
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
        [FromServices] IUserService service, [FromQuery] PaginationQuery pagination,
        [FromQuery] string? query, [FromQuery] short? birthMonth,
        [FromQuery] int? positionId, [FromQuery] int? classId
    )
    {
        var result = await service.GetPaginatedUsers(pagination, query, birthMonth, positionId, classId);
        return Ok(result);
    }

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

}