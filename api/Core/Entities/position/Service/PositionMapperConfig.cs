using Api.Domain.Models;
using AutoMapper;

namespace Api.Core.Services;

public class PositionMapperConfig : Profile
{
    public PositionMapperConfig()
    {
        CreateMap<PositionCreatePayload, Position>();

        CreateMap<PositionUpdatePayload, Position>()
            .ForAllMembers(opts => opts.Condition(
                (src, dest, srcMember) => srcMember is not null
            ));
    }
}