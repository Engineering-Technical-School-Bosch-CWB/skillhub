using Api.Domain.Services;

using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/login")]
public class LoginController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> TryLogin(
        [FromServices] ILoginService service,
        [FromBody] LoginPayload payload
    )
    {
        var result = await service.TryLogin(payload);
        return Ok(result);
    }
}
