using Api.Core.Errors;
using Api.Core.Services;
using Api.Domain.Enums;
using Api.Domain.Models;
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
        [FromServices] IFeedbackService service, UserContext userContext, int id
    )
    {
        var result = await service.GetFeedbackById(id);

        if (userContext.PermissionLevel != EPermissionLevel.Admin && result.Data.UserId != userContext.UserId)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> CreateFeedback(
        [FromServices] IFeedbackService service, UserContext userContext,
        [FromBody] FeedbackCreatePayload payload
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.CreateFeedback(payload, userContext.UserId);
        return Created("/api/v1/feedbacks", result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<ActionResult> UpdateFeedback(
        [FromServices] IFeedbackService service, UserContext userContext,
        [FromBody] FeedbackUpdatePayload payload, int id
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        var result = await service.UpdateFeedback(id, payload, userContext.UserId);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> DeleteFeedback(
        [FromServices] IFeedbackService service, UserContext userContext, int id
    )
    {
        if (userContext.PermissionLevel != EPermissionLevel.Admin)
            throw new ForbiddenAccessException("User don't have permission to this service!");

        await service.DeleteFeedback(id, userContext.UserId);
        return Ok();
    }
}