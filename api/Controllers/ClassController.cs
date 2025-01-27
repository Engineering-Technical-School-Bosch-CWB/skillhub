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
        [FromServices] IClassService service, UserContext userContext,
        [FromQuery] string? query
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.GetClasses(query);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> CreateClass(
        [FromServices] IClassService service,
        [FromBody] ClassCreatePayload payload
    )
    {
        var result = await service.CreateClass(payload);
        return Created("api/v1/classes", result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetClassPage(
        [FromServices] IClassService service, UserContext userContext,
        [FromQuery] string? query, [FromQuery] int? selectedStudentId,
        [FromQuery] int? selectedCurricularUnitId, [FromQuery] int? selectedSubjectAreaId, int id
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.GetClassPage(id, query, selectedStudentId, selectedCurricularUnitId, selectedSubjectAreaId);
        return Ok(result);
    }
}
