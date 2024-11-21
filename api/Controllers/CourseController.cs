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
        [FromServices] CourseService CourseService,
        [FromBody] CourseCreatePayload payload)
    {
        var result = await CourseService.CreateCourse(payload);
        return Created("/api/v1/Courses/register", result);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult> GetCourseById(
        [FromServices] CourseService CourseService,
        int id)
    {
        var result = await CourseService.GetCourseById(id);
        return new OkObjectResult(result);
    }

    [HttpGet]
    public ActionResult GetAllCourse(
        [FromServices] CourseService CourseService,
        [FromBody] PaginationOptions pagination)
    {
        var result = CourseService.GetCourses(pagination);
        return new OkObjectResult(result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> UpdateCourse(
        [FromServices] CourseService service,
        [FromBody] CourseUpdatePayload payload,
        int id)
    {
        var result = await service.UpdateCourse(id, payload);
        return new OkObjectResult(result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteCourse(
        [FromServices] CourseService service,
        int id)
    {
        await service.DeleteCourse(id);
        return Ok();
    }

}