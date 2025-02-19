using Api.Core.Services;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/exams")]
public class ExamController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateExam(
        [FromServices] IExamService service, [FromServices] IPermissionService permissionService,
        [FromBody] ExamCreatePayload payload
    )
    {
        permissionService.ValidatePermission();

        var result = await service.CreateExam(payload);
        return Created("/api/v1/exams", result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetExamEvaluationPage(
        [FromServices] IExamService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidatePermission();

        var result = await service.GetExamEvaluationPage(id);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> DeleteExam(
        [FromServices] IExamService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidatePermission();

        await service.DeleteExam(id);
        return NoContent();
    }
    
    [HttpGet]
    [Route("createExam/{id}")]
    public async Task<ActionResult> GetCreateExamPage(
        [FromServices] IExamService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidatePermission();

        var result = await service.GetCreateExamPage(id);
        return Ok(result);
    }
}