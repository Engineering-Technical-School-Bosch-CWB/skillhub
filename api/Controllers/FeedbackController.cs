using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/feedbacks")]
public class FeedbackController : ControllerBase
{
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetFeedbackById(
        [FromServices] IFeedbackService service, int id
    )
    {
        var result = await service.GetFeedbackById(id);
        return Ok(result);
    }
}