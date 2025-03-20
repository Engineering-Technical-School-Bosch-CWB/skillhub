using Api.Domain.Attributes;
using Api.Domain.Services;

using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("SkillHub/api/v1/login")]
public class LoginController : ControllerBase
{
    [HttpPost]
    [IgnoreAuthentication]
    public async Task<ActionResult> TryLogin(
        [FromServices] ILoginService service,
        [FromBody] LoginPayload payload
    )
    {
        var result = await service.TryLogin(payload);
        return Ok(result);
    }

    [HttpGet]
    [Route("resetPassword/{id}")]
    public async Task<ActionResult> ResetPassword(
        [FromServices] ILoginService service,
        [FromServices] IPermissionService permissionService,
        int id
    ){
        permissionService.ValidateAdmPermission();
        await service.ResetPassword(id);
        return Ok();
    }
}
