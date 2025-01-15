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

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetInstructorSubjectPage(
        [FromServices] ISubjectService subjectService,
        UserContext userContext, int id
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await subjectService.GetInstructorPage(id);
        return Ok(result);
    }

    [HttpGet]
    [Route("results/{id}")]
    public async Task<ActionResult> GetSubjectResultsPage(
        [FromServices] IStudentService studentService,
        UserContext userContext, int id
    )
    {
        var student = await studentService.GetByUserId(userContext.UserId)
            ?? throw new NotFoundException("Student found!");

        var result = await studentService.GetSubjectResultsPage(student.Id, id);
        return Ok(result);
    }

}