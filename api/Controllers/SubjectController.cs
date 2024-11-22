using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/subjects")]
public class SubjectController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> RegisterSubject(
        [FromServices] ISubjectService service,
        [FromBody] SubjectCreatePayload payload)
    {
        var result = await service.CreateSubject(payload);
        return Created("api/v1/subjects", result);
    }
}