using Api.Core.Services;
using Api.Domain.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1/students")]
public class StudentController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> RegisterStudent(
        [FromServices] StudentService service,
        [FromBody] StudentCreatePayload payload)
    {
        var result = await service.CreateStudent(payload);
        return Created("api/v1/students", result);
    }
}