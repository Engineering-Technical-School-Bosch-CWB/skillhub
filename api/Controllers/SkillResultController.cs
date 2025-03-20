using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("SkillHub/api/v1/skillResults")]
public class SkillResultController : ControllerBase
{

    [HttpGet]
    [Route("skill/{skillId}")]
    public async Task<ActionResult> GetSkillResultBySkill(
        [FromServices] ISkillResultService service, UserContext userContext,
        [FromServices] IStudentService studentService, int skillId
    )
    {
        var studentProfile = await studentService.GetByUserId(userContext.UserId)
            ?? throw new NotFoundException("Student not found!");

        var result = await service.GetSkillResultBySkill(skillId, studentProfile.Id);
        return Ok(result);
    }

    [HttpGet]
    [Route("history/skill/{skillId}")]
    public async Task<ActionResult> GetSkillResultHistory(
        [FromServices] ISkillResultService service, UserContext userContext, [FromServices] IPermissionService permissionService,
        [FromServices] IStudentService studentService, [FromQuery] int? studentId, int skillId
    )
    {
        var studentProfile = await studentService.GetByUserId(userContext.UserId);

        if (!studentId.HasValue && studentProfile is null)
            throw new NotFoundException("Student not found!");

        // if (studentProfile?.Id != studentId)
        //     throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.GetSkillResultHistory(studentId ?? studentProfile!.Id, skillId);
        return Ok(result);
    }

    [HttpPost]
    [Route("exam/{examId}")]
    public async Task<ActionResult> EvaluateExam(
        [FromServices] ISkillResultService service, [FromServices] IPermissionService permissionService,
        [FromBody] IEnumerable<StudentEvaluatePayload> payload, int examId
    )
    {
        permissionService.ValidateAdmPermission();

        var result = await service.EvaluateExam(examId, payload);
        return Ok(result);
    }
}