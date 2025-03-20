using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("SkillHub/api/v1/objections")]
public class ObjectionController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateObjection(
        [FromServices] IObjectionService service,
        [FromBody] ObjectionPayload payload
    )
    {
        var result = await service.CreateObjection(payload);
        return Ok(result);
    }
}