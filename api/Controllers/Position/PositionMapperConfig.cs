using Api.Domain.Models;
using AutoMapper;

namespace Api.Controllers.Mappers
{
    public class PositionMapperConfig : Profile
    {
        public PositionMapperConfig()
        {
            CreateMap<PositionPayload, Position>();
        }
    }
}