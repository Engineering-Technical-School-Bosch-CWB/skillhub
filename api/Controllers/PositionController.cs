using Api.Domain.Models;
using Api.Domain.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/position")]
    public class PositionController
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
        public async Task<ActionResult<PositionResponse>> Create(
                [FromServices] IPositionService service,
                [FromBody] PositionPayload payload)
        {
            var position = ToPosition(payload);
            var result = await service.AddAsync(position);

            return new CreatedAtActionResult(
                    nameof(Create),
                    nameof(PositionController),
                    PositionResponse.ToResponse(result),
                    result);
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<ActionResult<PositionResponse>> Update(
                [FromServices] IPositionService service,
                [FromBody] PositionPayload payload,
                int id)
        {
            var position =  ToPosition(payload);
            var result = await service.UpdateAsync(id, position);
            
            return new OkObjectResult(PositionResponse.ToResponse(result));
        }

        private Position ToPosition(PositionPayload payload)
        {
            var newPosition = new Position();
            _mapper.Map(payload, newPosition);

            return newPosition;
        }
    }
}