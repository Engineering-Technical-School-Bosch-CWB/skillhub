using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Enums;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/skillResults")]
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
        [FromServices] ISkillResultService service, UserContext userContext,
        [FromServices] IStudentService studentService, [FromQuery] int? studentId, int skillId
    )
    {
        var studentProfile = await studentService.GetByUserId(userContext.UserId);

        if (!studentId.HasValue && studentProfile is null)
            throw new NotFoundException("Student not found!");

        if (userContext.PermissionLevel != EPermissionLevel.Admin && studentProfile?.Id != studentId)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.GetSkillResultHistory(studentId ?? studentProfile!.Id, skillId);
        return Ok(result);
    }

    [HttpGet]
    [Route("exam/{examId}")]
    public async Task<ActionResult> GetExamEvaluationPage(
        [FromServices] ISkillResultService service, UserContext userContext, int examId
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.GetExamEvaluationPage(examId);
        return Ok(result);
    }

    [HttpPost]
    [Route("exam/{examId}")]
    public async Task<ActionResult> EvaluateExam(
        [FromServices] ISkillResultService service, UserContext userContext,
        [FromBody] IEnumerable<StudentEvaluatePayload> payload, int examId
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.EvaluateExam(examId, payload);
        return Ok(result);
    }
}