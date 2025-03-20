using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Enums;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("SkillHub/api/v1/sectors")]
public class SectorController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetAll(
        [FromServices] ISectorService service,
        [FromQuery] PaginationQuery pagination
        
    ) {
        var result = await service.GetSectors(pagination);
        return Ok(result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetById(
        [FromServices] ISectorService service,
        int id
    ) {
        var result = await service.GetSectorById(id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> Create(
        [FromBody] SectorCreatePayload payload, [FromServices] IPermissionService permissionService,
        [FromServices] ISectorService service
    ){
        permissionService.ValidateAdmPermission();

        var result = await service.CreateSector(payload);
        return Ok(result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> Update(
        [FromBody] SectorUpdatePayload payload, [FromServices] IPermissionService permissionService,
        [FromServices] ISectorService service, int id
    ){
        permissionService.ValidateAdmPermission();

        var result = await service.UpdateSector(id, payload);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> Delete(
        [FromServices] ISectorService service, [FromServices] IPermissionService permissionService, int id
    ){
        permissionService.ValidateAdmPermission();
        
        await service.DeleteSector(id);
        return NoContent();
    }

}