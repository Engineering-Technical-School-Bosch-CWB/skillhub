using Api.Domain.Attributes;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("SkillHub/api/v1/calendar/classEvent")]
public class ClassEventController : ControllerBase
{
    [HttpGet]
    [StudentCanBeAccess]
    public async Task<ActionResult> GetPage(
        [FromServices] IClassEventService service,
        [FromQuery] int classId, 
        [FromQuery] int year, 
        [FromQuery] int month
    )
    {
        var data = await service.GetClassPage(year,month,classId);
        return Ok(data);
    }
}