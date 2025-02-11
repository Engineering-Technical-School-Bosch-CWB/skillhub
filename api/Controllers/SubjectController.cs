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
        [FromServices] ISubjectService service,
        [FromBody] SubjectCreatePayload payload
    )
    {
        var result = await service.CreateSubject(payload);
        return Created("api/v1/subjects", result);
    }
    [HttpPost]
    [Route("byClass/{id}")]
    public async Task<ActionResult> CreateSubjectByClass(
        [FromServices] ISubjectService service,
        [FromBody] IEnumerable<SubjectCreateByClassPayload> payload,
        UserContext userContext, 
        int id
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.CreateSubjectsByClass(payload, id);
        return Created("api/v1/subjects", result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetInstructorSubjectPage(
        [FromServices] ISubjectService service,
        UserContext userContext, int id
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.GetInstructorPage(id);
        return Ok(result);
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