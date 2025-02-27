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
        permissionService.ValidateAdmPermission();

        var result = await service.CreateExam(payload);
        return Created("/api/v1/exams", result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> UpdateExam(
        [FromServices] IExamService service, [FromServices] IPermissionService permissionService, int id,
        [FromBody] ExamUpdatePayload payload
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.UpdateExam(id, payload);
        return Ok(result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetExamEvaluationPage(
        [FromServices] IExamService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.GetExamEvaluationPage(id);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> DeleteExam(
        [FromServices] IExamService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidateAdmPermission();

        await service.DeleteExam(id);
        return NoContent();
    }
    
    [HttpGet]
    [Route("createExam/{subjectId}")]
    public async Task<ActionResult> GetCreateExamPage(
        [FromServices] IExamService service, [FromServices] IPermissionService permissionService, int subjectId
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.GetCreateExamPage(subjectId);
        return Ok(result);
    }

    [HttpGet]
    [Route("editExam/{id}")]
    public async Task<ActionResult> GetEditExamPage(
        [FromServices] IExamService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.GetEditExamPage(id);
        return Ok(result);
    }
}