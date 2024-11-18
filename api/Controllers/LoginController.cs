using Api.Core.Services.Login;
using Api.Domain.Services.Login;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/login")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Login(
            [FromServices] LoginService loginService,
            [FromBody] LoginPayload payload)
        {
            var result = await loginService.TryLogin(payload);
            return Ok(result);
        }
    }
}