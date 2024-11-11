using Api.Core.Services;
using Api.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/users")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> RegisterUser(
            [FromServices] UserService userService,
            [FromBody] UserCreatePayload payload)
        {
            var result = await userService.CreateUser(payload);
            return Created("/api/v1/users/register", result);
        }

    }
}