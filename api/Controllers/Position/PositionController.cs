using api.Core.Services;
using api.Domain.Models;
using api.Domain.Services.Pagination;
using Api.Domain.Models;
using Api.Domain.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/v1/position")]
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
        public async Task<ActionResult> Create(
                [FromServices] IPositionService service,
                [FromBody] PositionPayload payload)
        {
            var position = ToPosition(payload);
            var result = await service.AddAsync(position);

            return Created("api/v1/position", PositionResponse.ToResponse(result));
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<ActionResult> Update(
                [FromServices] IPositionService service,
                [FromBody] PositionPayload payload,
                int id)
        {
            var result = await service.UpdatePositionAsync(id, payload);

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetPaginated(
                [FromServices] IPositionService service,
                [FromQuery] PaginationQuery pagination)
        {
            var result = await service.GetPaginatedAsync(pagination);

            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Get(
                [FromServices] IPositionService service,
                int id)
        {
            var position = new Position
            {
                Id = id
            };
            var result = await service.GetAsync(position);

            return Ok(PositionResponse.ToResponse(result));
        }

        private Position ToPosition(PositionPayload payload)
        {
            var newPosition = new Position();
            _mapper.Map(payload, newPosition);

            return newPosition;
        }
    }
}