using Api.Core.Services;
using Api.Domain.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/classes")]
    public class ClassController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> RegisterClass(
            [FromServices] ClassService classService,
            [FromBody] ClassCreatePayload payload)
        {
            var result = await classService.CreateClass(payload);
            return Created("api/v1/classes", result);
        }
    }
}