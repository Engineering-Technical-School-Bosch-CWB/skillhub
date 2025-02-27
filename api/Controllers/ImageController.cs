using Api.Core.Middlewares;
using Api.Domain.Attributes;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/images")]
[IgnoreAuthentication]
public class ImageController: ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetImage(
        [FromServices] IImageService service,
        [FromQuery]string id,
        [FromQuery]ImageSizeEnum size
    ){
        var result = await service.GetImage(id, size);
        return File(result, "image/jpeg");
    }
}