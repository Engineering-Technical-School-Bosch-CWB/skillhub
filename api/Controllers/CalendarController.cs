using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("SkillHub/api/v1/calendar")]

public class CalendarController: ControllerBase
{



     [HttpPost]
     [Route("event")]
    public async Task<ActionResult> CreateEvent(
        [FromServices] IEventService service, [FromServices] IPermissionService permissionService,
        [FromBody] EventCreatePayload payload
    )
    {
        permissionService.ValidateAdmPermission();
        var result = await service.CreateEvent(payload);
        return Ok(result);
    }



    [HttpPatch]
    [Route("event")]
    public async Task<ActionResult> UpdateEvent(
        [FromServices] IEventService service, [FromServices] IPermissionService permissionService,
        [FromBody] IEnumerable<EventUploadPayload> payload
    )
    {
        permissionService.ValidateAdmPermission();
        var result = await service.UpdateEvent(payload);
        return Ok(result);
    }



    [HttpDelete]
    [Route("event/{id}")]
    public async Task<ActionResult> DeleteEvent(
        [FromServices] IEventService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidateAdmPermission();
        await service.DeleteEvent(id);
        return Ok("Deleted");
    }

     [HttpPost]
     [Route("eventType")]
    public async Task<ActionResult> CreateEventType(
        [FromServices] IEventTypeService service, [FromServices] IPermissionService permissionService,
        [FromBody] EventTypeCreatePayload payload
    )
    {
        permissionService.ValidateAdmPermission();
        var result = await service.CreateEventType(payload);
        return Ok(result);
    }


    [HttpGet]
    [Route("eventType")]
    public async Task<ActionResult> GetEventType(
        [FromServices] IEventTypeService service, [FromServices] IPermissionService permissionService
    )
    {
        permissionService.ValidateAdmPermission();
        var result = await service.GetEventTypes();
        return Ok(result);
    }

    [HttpPatch]
    [Route("eventType/{id}")]
    public async Task<ActionResult> UpdateEventType(
        [FromServices] IEventTypeService service, [FromServices] IPermissionService permissionService,
        [FromBody] EventTypeUpdatePayload payload,
        int id
    )
    {
        permissionService.ValidateAdmPermission();
        var result = await service.UpdateEventType(id,payload);
        return Ok(result);
    }

    [HttpDelete]
    [Route("eventType/{id}")]
    public async Task<ActionResult> DeleteEventType(
        [FromServices] IEventTypeService service, [FromServices] IPermissionService permissionService, int id
    )
    {
        permissionService.ValidateAdmPermission();
        await service.DeleteEventType(id);
        return Ok("Deleted");
    }

}