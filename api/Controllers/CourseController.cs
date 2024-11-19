using Api.Domain.Services;
using Api.Core.Services;
using Api.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/course")]
public class CourseController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> RegisterCourse(
        [FromServices] ICourseService CourseService,
        [FromBody] CourseCreatePayload payload)
    {
        var result = await CourseService.CreateCourse(payload);
        return Created("/api/v1/Courses/register", result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetCourseById(
        [FromServices] ICourseService CourseService,
        int id)
    {
        var result = await CourseService.GetCourseById(id);
        return new OkObjectResult(result);
    }

    [HttpGet]
    public ActionResult GetAllCourse(
        [FromServices] ICourseService CourseService,
        [FromBody] PaginationQuery pagination)
    {
        var result = CourseService.GetCourses(pagination);
        return new OkObjectResult(result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> UpdateCourse(
        [FromServices] ICourseService service,
        [FromBody] CourseUpdatePayload payload,
        int id)
    {
        var result = await service.UpdateCourse(id, payload);
        return new OkObjectResult(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteCourse(
        [FromServices] ICourseService service,
        int id)
    {
        await service.DeleteCourse(id);
        return NoContent();
    }

}