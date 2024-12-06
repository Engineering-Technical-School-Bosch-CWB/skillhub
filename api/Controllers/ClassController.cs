using Api.Domain.Models;
using Api.Domain.Services;

using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/classes")]
public class ClassController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateClass(
        [FromServices] IClassService classService,
        [FromBody] ClassCreatePayload payload
    )
    {
        var result = await classService.CreateClass(payload);
        return Created("api/v1/classes", result);
    }
}
