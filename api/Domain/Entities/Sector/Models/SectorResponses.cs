using Api.Domain.Services;

namespace Api.Domain.Models;

public class SectorResponse
{
    public required string Message { get; set; }
    public required SectorDTO Data { get; set; }

    public static SectorResponse Map(Sector sector, string text)
    {
        return new SectorResponse()
        {
            Message = text,
            Data = SectorDTO.Map(sector)
        };
    }
};

public class SectorPaginationResponse
{
    public required IEnumerable<SectorDTO> Sectors { get; set; }
    public required PaginationInfo PaginationInfo { get; set; }
    public required string Message { get; set; }
    public static SectorPaginationResponse Map((IEnumerable<Sector>, PaginationInfo) tuple, string text)
    {
        return new SectorPaginationResponse
        {
            Sectors = tuple.Item1.Select(SectorDTO.Map),
            PaginationInfo = tuple.Item2,
            Message = text
        };
    }
}
