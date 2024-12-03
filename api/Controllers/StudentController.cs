using Api.Domain.Models;
using Api.Domain.Services;

using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/students")]
public class StudentController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateStudent(
        [FromServices] IStudentService service,
        [FromBody] StudentCreatePayload payload
    )
    {
        var result = await service.CreateStudent(payload);
        return Created("api/v1/students", result);
    }

    [HttpGet]
    [Route("results/{id}")]
    public async Task<ActionResult> GetUserResultsPage(
    [FromServices] IStudentService service,
    int id
    )
    {
        var result = await service.GetResultsPage(id);
        return Ok(result);
    }

    [HttpGet]
    [Route("results/{id}/subject/{subjectId}")]
    public async Task<ActionResult> GetSubjectResultsPage(
        [FromServices] IStudentService service,
        int id, int subjectId
    )
    {
        var result = await service.GetSubjectResultsPage(id, subjectId);
        return Ok(result);
    }
}