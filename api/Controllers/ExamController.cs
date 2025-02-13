using Api.Core.Services;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/exams")]
public class ExamController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateExam(
        [FromServices] IExamService service,
        [FromBody] ExamCreatePayload payload
    )
    {
        var result = await service.CreateExam(payload);
        return Created("/api/v1/exams", result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult> DeleteExam(
        [FromServices] IExamService service, UserContext userContext, int id
    )
    {
        await service.DeleteExam(id);
        return NoContent();
    }
}