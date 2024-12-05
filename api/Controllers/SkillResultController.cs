using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Enums;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1/skillResults")]
public class SkillResultController : ControllerBase
{
    [HttpGet]
    [Route("history/{studentId}/skill/{skillId}")]
    public async Task<ActionResult> GetSkillResultHistory(
        [FromServices] ISkillResultService service, UserContext userContext,
        [FromServices] IStudentService studentService, int studentId, int skillId
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
        {
            var student = await studentService.GetByUserId(userContext.UserId);
            if (student is null || student.Id != studentId)
                throw new ForbiddenAccessException("User don't have permission to this service!");
        }

        var result = await service.GetSkillResultHistory(studentId, skillId);
        return Ok(result);
    }

}