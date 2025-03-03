﻿using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/v1/OccupationArea")]
public class OccupationAreaController : ControllerBase
{
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetById (
        [FromServices] IOccupationAreaService service, UserContext userContext,
        int id
    )
    {
        if(userContext.PermissionLevel != Api.Domain.Enums.EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.GetOccupationAreaById(id);
        return Ok(result);
    }
    [HttpGet]
    public async Task<ActionResult> GetPaginated(
        [FromServices] IOccupationAreaService service,
        [FromQuery] PaginationQuery pagination,
        [FromQuery] string? query
    )
    {
        var entities = service.GetPaginated(pagination, query);
        return Ok(entities);
    }

    [HttpPost]
    public async Task<ActionResult> CreateOccupationArea(
        [FromServices] IOccupationAreaService service, [FromServices] IPermissionService permissionService,
        [FromBody] OccupationArea payload
    )
    {
        permissionService.ValidateAdmPermission();

        payload.IsActive = true;
        var result = await service.AddAsync(payload);
        return Ok(result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> Update(
        [FromServices] IOccupationAreaService service, [FromServices] IPermissionService permissionService,
        [FromBody] UpdateOcupationAreaPayload payload,
        int id
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.UpdateOccupationArea(id, payload);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> Delete(
        [FromServices] IOccupationAreaService service, [FromServices] IPermissionService permissionService,
        int id
    )
    {
        permissionService.ValidateAdmPermission();

        await service.DeleteOccupationArea(id);
        return Ok();
    }
}
 