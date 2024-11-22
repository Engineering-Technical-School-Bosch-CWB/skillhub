using api.Domain.Models;
using Api.Domain.Models;
using AutoMapper;

namespace api.Core.Services
{
    public class PositionMapperConfig : Profile
    {
        public PositionMapperConfig()
        {
            CreateMap<PositionPayload, Position>();
        }
    }
}