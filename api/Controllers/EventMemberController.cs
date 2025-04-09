using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("SkillHub/api/v1/calendar/eventMember")]
public class EventMemberController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetTeachersAndEvents(
        [FromServices] IEventMemberService service,
        [FromServices] IPermissionService permissionService,
        [FromQuery] int year,
        [FromQuery] int month,
        [FromQuery] int? occupationAreaId
    )
    {
        permissionService.ValidateAdmPermission();
        var results = await service.GetTeacherEvents(year, month, occupationAreaId);

        return Ok(results.Data);
    }
}