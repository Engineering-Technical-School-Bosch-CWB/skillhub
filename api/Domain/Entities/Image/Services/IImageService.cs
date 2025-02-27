using Genesis.Domain.Services;
using Api.Domain.Models;

namespace Api.Domain.Services;

public interface IImageService : IService<Image>
{
    public Task<byte[]> GetImage(string id, ImageSizeEnum size);
    public Task UploadUserProfileImage(IFormFile file, int userId);
    public Task DeleteUserProfileImage(int userId);
}
