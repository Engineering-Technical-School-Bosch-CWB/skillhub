using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/users")]
public class UserController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateUser(
        [FromServices] IUserService service,
        [FromBody] UserCreatePayload payload
    )
    {
        var result = await service.CreateUser(payload);
        return Created("/api/v1/users", result);
    }



    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> UpdateUser(
        [FromServices] IUserService service,
        [FromBody] UserUpdatePayload payload
    )
    {
        var result = await service.UpdateUser(payload);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteUser(
        [FromServices] IUserService service,
        int id
    )
    {
        await service.DeleteUser(id);
        return Ok();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetUser(
        [FromServices] IUserService service,
        int id
    )
    {
        var result = await service.GetUser(id);
        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult> GetPaginatedUsers(
        [FromServices] IUserService service,
        [FromQuery] PaginationQuery pagination,
        [FromQuery] string? query,
        [FromQuery] short? birthMonth,
        [FromQuery] int? positionId,
        [FromQuery] int? classId
    )
    {
        var result = await service.GetPaginatedUsers(pagination, query, birthMonth, positionId, classId);
        return Ok(result);
    }

}