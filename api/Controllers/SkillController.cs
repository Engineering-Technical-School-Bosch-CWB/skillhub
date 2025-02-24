using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Enums;
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
        [FromServices] ISkillService service, [FromServices] IPermissionService permissionService,
        [FromBody] SkillCreatePayload payload
    )
    {
        permissionService.ValidatePermission();

        var result = await service.CreateSkill(payload);
        return Created("/api/v1/skills", result);
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
        [FromQuery] PaginationQuery pagination,
        [FromServices] ISkillService service,
        int curricularUnitId
    )
    {
        var result = await service.GetByCurricularUnit(pagination, curricularUnitId);
        return Ok(result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> UpdateSkill(
        [FromServices] ISkillService service, [FromServices] IPermissionService permissionService,
        [FromBody] SkillUpdatePayload payload,
        int id
    )
    {
        permissionService.ValidatePermission();

        var result = await service.UpdateSkill(id, payload);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteSkill(
        [FromServices] ISkillService service, [FromServices] IPermissionService permissionService,
        int id
    )
    {
        permissionService.ValidatePermission();

        await service.DeleteSkill(id);
        return NoContent();
    }

}