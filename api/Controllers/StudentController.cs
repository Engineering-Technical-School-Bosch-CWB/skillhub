using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/students")]
    public class StudentController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> RegisterStudent(
            [FromServices] IStudentService service,
            [FromBody] StudentCreatePayload payload)
        {
            var result = await service.CreateStudent(payload);
            return Created("api/v1/students", result);
        }
    }
}