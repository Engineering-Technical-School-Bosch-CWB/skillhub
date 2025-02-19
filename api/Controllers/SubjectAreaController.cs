using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/subjectAreas")]
public class SubjectAreaController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateSubjectArea(
        [FromServices] ISubjectAreaService service, [FromServices] IPermissionService permissionService,
        [FromBody] SubjectAreaPayload payload
    )
    {
        permissionService.ValidatePermission();

        var result = await service.CreateSubjectArea(payload);
        return Created("/api/v1/subjectAreas", result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> UpdateSubjectArea(
        [FromServices] ISubjectAreaService service, [FromServices] IPermissionService permissionService,
        [FromBody] SubjectAreaPayload payload,
        int id
    )
    {
        permissionService.ValidatePermission();

        var result = await service.UpdateSubjectArea(id, payload);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteSubjectArea(
        [FromServices] ISubjectAreaService service, [FromServices] IPermissionService permissionService,
        int id
    )
    {
        permissionService.ValidatePermission();

        await service.DeleteSubjectArea(id);
        return NoContent();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetSubjectArea(
        [FromServices] ISubjectAreaService service,
        int id
    )
    {
        var result = await service.GetSubjectArea(id);
        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult> GetAllSubjectAreas(
        [FromServices] ISubjectAreaService service,
        [FromQuery] PaginationQuery pagination
    )
    {
        var result = await service.GetAllSubjectAreas(pagination);
        return Ok(result);
    }
}