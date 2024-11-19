using Api.Domain.Models;

using AutoMapper;

namespace Api.Controllers;

public class PositionMapperConfig : Profile
{
    public PositionMapperConfig()
    {
        CreateMap<PositionPayload, Position>();
    }
}