using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/curricularUnits")]
public class CurricularUnitController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateCurricularUnit(
        [FromServices] ICurricularUnitService service,
        [FromBody] CurricularUnitCreatePayload payload
    )
    {
        var result = await service.CreateCurricularUnit(payload);
        return Created("/api/v1/curricularUnits", result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetCurricularUnit(
        [FromServices] ICurricularUnitService service,
        int id
    )
    {
        var result = await service.GetCurricularUnit(id);
        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult> GetPaginatedCurricularUnits(
        [FromServices] ICurricularUnitService service,
        [FromQuery] PaginationQuery pagination,
        [FromQuery] string? query,
        [FromQuery] int? subjectAreaId
    )
    {
        var result = await service.GetPaginatedCurricularUnits(pagination, query, subjectAreaId);
        return Ok(result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> UpdateCurricularUnit(
        [FromServices] ICurricularUnitService service,
        [FromBody] CurricularUnitUpdatePayload payload,
        int id
    )
    {
        var result = await service.UpdateCurricularUnit(id, payload);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteCurricularUnit(
        [FromServices] ICurricularUnitService service,
        int id
    )
    {
        await service.DeleteCurricularUnit(id);
        return Ok();
    }
}