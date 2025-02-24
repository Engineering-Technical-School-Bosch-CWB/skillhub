using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Enums;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/subjects")]
public class SubjectController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateSubject(
        [FromServices] ISubjectService service, [FromServices] IPermissionService permissionService,
        [FromBody] SubjectCreatePayload payload
    )
    {

        permissionService.ValidatePermission();

        var result = await service.CreateSubject(payload);
        return Created("api/v1/subjects", result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> UpdateSubject(
        [FromServices] ISubjectService service, [FromServices] IPermissionService permissionService,
        [FromBody] SubjectUpdatePayload payload, int id
    )
    {
        permissionService.ValidatePermission();

        var result = await service.UpdateSubject(id, payload);
        return Ok(result);
    }

    [HttpPost]
    [Route("byClass/{id}")]
    public async Task<ActionResult> CreateSubjectByClass(
        [FromServices] ISubjectService service, [FromServices] IPermissionService permissionService,
        [FromBody] IEnumerable<SubjectCreateByClassPayload> payload, int id
    )
    {
        permissionService.ValidatePermission();

        var result = await service.CreateSubjectsByClass(payload, id);
        return Created("api/v1/subjects", result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetInstructorSubjectPage(
        [FromServices] ISubjectService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidatePermission();

        var result = await service.GetInstructorPage(id);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> DeleteSubject(
        [FromServices] ISubjectService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidatePermission();

        await service.DeleteSubject(id);
        return NoContent();
    }

    [HttpGet]
    [Route("class/{classId}")]
    public async Task<ActionResult> GetSubjectPaginated(
        [FromServices] ISubjectService service,
        [FromQuery] PaginationQuery pagination,
        [FromQuery] string? query, [FromQuery] int? studentId, int classId
    )
    {
        var result = await service.GetSubjectPaginated(pagination, classId, studentId, query);
        return Ok(result);
    }
}