using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Attributes;
using Api.Domain.Enums;
using Api.Domain.Models;
using Api.Domain.Services;

using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("SkillHub/api/v1/students")]
public class StudentController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateStudent(
        [FromServices] IStudentService service, [FromServices] IPermissionService permissionService,
        [FromBody] StudentCreatePayload payload
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.CreateStudent(payload);
        return Created("api/v1/students", result);
    }

    [HttpGet]
    [Route("results")]
    [StudentCanBeAccess]
    public async Task<ActionResult> GetResultsPage(
        [FromServices] IStudentService service,
        UserContext userContext, [FromQuery] string? query
    )
    {
        var student = await service.GetByUserId(userContext.UserId)
            ?? throw new NotFoundException("Student found!");

        var result = await service.GetResultsPage(student.Id, query ?? "");
        return Ok(result);
    }

    [HttpGet]
    [Route("results/{subjectId}")]
    [StudentCanBeAccess]
    public async Task<ActionResult> GetSubjectResultsPage(
        [FromServices] IStudentService service,
        UserContext userContext, int subjectId
    )
    {
        var student = await service.GetByUserId(userContext.UserId)
            ?? throw new NotFoundException("Student not found!");

        var result = await service.GetSubjectResultsPage(student.Id, subjectId);
        return Ok(result);
    }
}