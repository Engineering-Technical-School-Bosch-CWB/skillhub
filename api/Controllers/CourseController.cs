using Api.Domain.Services;
using Api.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/course")]
public class CourseController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateCourse(
        [FromServices] ICourseService service,
        [FromBody] CourseCreatePayload payload
    )
    {
        var result = await service.CreateCourse(payload);
        return Created("/api/v1/courses", result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetCourseById(
        [FromServices] ICourseService service,
        int id
    )
    {
        var result = await service.GetCourseById(id);
        return Ok(result);
    }

    [HttpGet]
    public ActionResult GetAllCourses(
        [FromServices] ICourseService service,
        [FromQuery] PaginationQuery pagination,
        [FromQuery] string? query
    )
    {
        var result = service.GetCourses(pagination, query);
        return Ok(result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> UpdateCourse(
        [FromServices] ICourseService service,
        [FromBody] CourseUpdatePayload payload,
        int id
    )
    {
        var result = await service.UpdateCourse(id, payload);
        return Ok(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteCourse(
        [FromServices] ICourseService service,
        int id
    )
    {
        await service.DeleteCourse(id);
        return Ok();
    }

}