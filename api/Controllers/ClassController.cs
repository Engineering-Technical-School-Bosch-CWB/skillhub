using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Enums;
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
        permissionService.ValidatePermission();

        var result = await service.GetClasses(query);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> CreateClass(
        [FromServices] IClassService service, [FromServices] IPermissionService permissionService,
        [FromBody] ClassCreatePayload payload
    )
    {
        permissionService.ValidatePermission();

        var result = await service.CreateClass(payload);
        return Created("api/v1/classes", result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetClassPage(
        [FromServices] IClassService service, [FromServices] IPermissionService permissionService,
        [FromQuery] string? query, [FromQuery] int? selectedStudentId,
        [FromQuery] int? selectedCurricularUnitId, [FromQuery] int? selectedSubjectAreaId, int id
    )
    {
        permissionService.ValidatePermission();

        var result = await service.GetClassPage(id, query, selectedStudentId, selectedCurricularUnitId, selectedSubjectAreaId);
        return Ok(result);
    }
}
