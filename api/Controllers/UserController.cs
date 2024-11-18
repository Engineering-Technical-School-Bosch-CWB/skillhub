using Api.Core.Services;
using Api.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/users")]
    public class UserController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> RegisterUser(
            [FromServices] UserService userService,
            [FromBody] UserCreatePayload payload)
        {
            var result = await userService.CreateUser(payload);
            return Created("/api/v1/users/register", result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> UpdateUser(
            [FromServices] UserService service,
            [FromBody] UserUpdatePayload payload,
            int id)
        {
            var result = await service.UpdateUser(id, payload);
            return new OkObjectResult(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUser(
            [FromServices] UserService service,
            int id)
        {
            await service.DeleteUser(id);
            return Ok();
        }

    }
}