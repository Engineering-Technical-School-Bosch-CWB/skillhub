using Api.Domain.Models;
using Api.Domain.Services;

using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/classes")]
public class ClassController : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult> GetClasses(
        [FromServices] IClassService service, [FromServices] IPermissionService permissionService,
        [FromQuery] string? query
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.GetClasses(query);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> CreateClass(
        [FromServices] IClassService service, [FromServices] IPermissionService permissionService,
        [FromBody] ClassCreatePayload payload
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.CreateClass(payload);
        return Created("api/v1/classes", result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> UpdateClass(
        [FromServices] IClassService service, [FromServices] IPermissionService permissionService, [FromBody] ClassUpdatePayload payload, int id
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.UpdateClass(id, payload);
        return Ok(result);
    }

    [HttpPatch]
    [Route("archive/{id}")]
    public async Task<ActionResult> ArchiveClass(
        [FromServices] IClassService service, [FromServices] IPermissionService permissionService, int id, bool? archive
    )
    {
        permissionService.ValidateAdmPermission();

        await service.ArchiveClass(id, archive ?? true);
        return NoContent();
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> DeleteClass(
        [FromServices] IClassService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidateAdmPermission();

        await service.DeleteClass(id);
        return NoContent();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetClassPage(
        [FromServices] IClassService service, [FromServices] IPermissionService permissionService,
        [FromQuery] string? query, [FromQuery] int? selectedStudentId,
        [FromQuery] int? selectedCurricularUnitId, [FromQuery] int? selectedSubjectAreaId, int id
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.GetClassPage(id, query, selectedStudentId, selectedCurricularUnitId, selectedSubjectAreaId);
        return Ok(result);
    }
}
