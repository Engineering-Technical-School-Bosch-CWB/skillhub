using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/skills")]
public class SkillController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateSkill(
        [FromServices] ISkillService service,
        [FromBody] SkillCreatePayload payload
    )
    {
        var result = await service.CreateSkill(payload);
        return Created("/api/v1/Skills", result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetSkill(
        [FromServices] ISkillService service,
        int id
    )
    {
        var result = await service.GetSkill(id);
        return Ok(result);
    }

    [HttpGet]
    [Route("curricularUnit/{curricularUnitId}")]
    public async Task<ActionResult> GetByCurricularUnit(
        [FromServices] ISkillService service,
        int curricularUnitId
    )
    {
        var result = await service.GetByCurricularUnit(curricularUnitId);
        return Ok(result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> UpdateSkill(
        [FromServices] ISkillService service,
        [FromBody] SkillUpdatePayload payload,
        int id
    )
    {
        var result = await service.UpdateSkill(id, payload);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteSkill(
        [FromServices] ISkillService service,
        int id
    )
    {
        await service.DeleteSkill(id);
        return Ok();
    }
}