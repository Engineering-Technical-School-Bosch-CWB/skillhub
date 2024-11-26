using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/users")]
public class UserController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> RegisterUser(
        [FromServices] IUserService userService,
        [FromBody] UserCreatePayload payload
    )
    {
        var result = await userService.CreateUser(payload);
        return Created("/api/v1/users", result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> UpdateUser(
        [FromServices] IUserService service,
        [FromBody] UserUpdatePayload payload,
        int id
    )
    {
        var result = await service.UpdateUser(id, payload);
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
    public async Task<IActionResult> Get(
        [FromServices] IUserService service,
        int id
    )
    {
        var result = await service.Get(id);
        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult> GetPaginated(
        [FromServices] IUserService service,
        [FromQuery] PaginationQuery pagination,
        [FromQuery] string? query,
        [FromQuery] short? birthMonth
    )
    {
        var result = await service.GetPaginated(pagination, query, birthMonth);
        return Ok(result);
    }

}