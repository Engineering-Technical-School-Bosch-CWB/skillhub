namespace Api.Domain.Models;

public class UploadProfileImagePayload
{
    public required IFormFile File { get; set; }
    public int UserId { get; set; }
}

