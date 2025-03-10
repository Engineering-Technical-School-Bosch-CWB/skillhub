using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public ActionResult GetPaginated(
        [FromServices] IOccupationAreaService service,
        [FromQuery] PaginationQuery pagination,
        [FromQuery] string? query, [FromQuery] int? id
    )
    {
        var entities = service.GetPaginated(pagination, query, id);
        return Ok(entities);
    }

    [HttpPost]
    public async Task<ActionResult> CreateOccupationArea(
        [FromServices] IOccupationAreaService service, [FromServices] IPermissionService permissionService,
        [FromBody] OccupationArea payload
    )
    {
        permissionService.ValidateAdmPermission();
        var res = await service.CreateOccupationArea(payload);
        return Ok(res);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> Update(
        [FromServices] IOccupationAreaService service, [FromServices] IPermissionService permissionService,
        [FromBody] UpdateOccupationAreaPayload payload, IOccupationAreaRepository repository,
        int id
    )
    {
        permissionService.ValidateAdmPermission();

        if (await repository.GetAllNoTracking().Where(o => o.IsActive && o.Id != id).AnyAsync(o => string.Equals(o.Name, payload.Name)))
            throw new AlreadyExistsException("There's already a subject area with this name!");

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
 