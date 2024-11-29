using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/subjectAreas")]
public class SubjectAreaController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateSubjectArea(
        [FromServices] ISubjectAreaService service,
        [FromBody] SubjectAreaPayload payload
    )
    {
        var result = await service.CreateSubjectArea(payload);
        return Created("/api/v1/subjectAreas", result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> UpdateSubjectArea(
        [FromServices] ISubjectAreaService service,
        [FromBody] SubjectAreaPayload payload,
        int id
    )
    {
        var result = await service.UpdateSubjectArea(id, payload);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteSubjectArea(
        [FromServices] ISubjectAreaService service,
        int id
    )
    {
        await service.DeleteSubjectArea(id);
        return Ok();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetSubjectArea(
        [FromServices] ISubjectAreaService service,
        int id
    )
    {
        var result = await service.GetSubjectArea(id);
        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult> GetAllSubjectAreas(
        [FromServices] ISubjectAreaService service
    )
    {
        var result = await service.GetAllSubjectAreas();
        return Ok(result);
    }
}