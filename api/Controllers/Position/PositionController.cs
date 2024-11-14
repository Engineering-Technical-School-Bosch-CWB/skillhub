using api.Controllers.Mappers;
using api.Domain.Models;
using Api.Domain.Models;
using Api.Domain.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
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
            var newPosition = new Position();
            _mapper.Map(payload, newPosition);

            var result = await service.AddAsync(newPosition);

            var response = new PositionResponse()
            {
                Name = result.Name
            };

            return new OkObjectResult(response);
        }

        
    }
}