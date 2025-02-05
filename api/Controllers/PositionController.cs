using Api.Domain.Models;
using Api.Domain.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/positions")]
public class PositionController : ControllerBase
{
    private readonly Mapper _mapper;

    public PositionController()
    {
        var mapConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<PositionMapperConfig>();
            });

        _mapper = new Mapper(mapConfig);
    }

    [HttpPost]
    public async Task<ActionResult> CreatePosition(
        [FromServices] IPositionService service,
        [FromBody] PositionCreatePayload payload
    )
    {
        var position = new Position
        {
            Name = payload.Name,
            PermissionLevel = (short)payload.PermissionLevel,
            PositionType = (short)payload.PositionType
        };

        var result = await service.AddAsync(position);

        var response = new AppResponse<PositionDTO>(
            PositionDTO.Map(result),
            "Position created successfully!");

        return Created("api/v1/position", response);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> UpdatePosition(
        [FromServices] IPositionService service,
        [FromBody] PositionUpdatePayload payload,
        int id
    )
    {
        var result = await service.UpdatePositionAsync(id, payload);

        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult> GetPaginatedPositions(
        [FromServices] IPositionService service,
        [FromQuery] PaginationQuery pagination
    )
    {
        var result = await service.GetPaginatedAsync(pagination);
        return Ok(result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetPosition(
        [FromServices] IPositionService service,
        int id
    )
    {
        var position = await service.Get(id);
        return Ok(position);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> DeletePosition(
        [FromServices] IPositionService service,
        int id
    )
    {
        await service.SoftDeleteAsync(id);

        return NoContent();
    }
}