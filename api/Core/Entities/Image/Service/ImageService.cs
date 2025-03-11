using Genesis.Core.Services;
using Genesis.Core.Repositories;
using Api.Core.Helpers;
using Api.Domain.Models;
using Api.Domain.Services;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;

namespace Api.Core.Services;

public class ImageService(
        BaseRepository<Image> repository,
        IUserRepository userRepository
    ) : BaseService<Image>(repository), IImageService
{
    private readonly IUserRepository userRepository = userRepository;

    public async Task DeleteUserProfileImage(int userId)
    {
        var user = await userRepository.Get()
            .SingleOrDefaultAsync(u => u.IsActive && u.Id == userId)
                ?? throw new NotFoundException("User not found!");

        if(user.ProfilePicture is null)
            throw new NotFoundException("Image not found");

        var image = await repository.Get()
            .FirstOrDefaultAsync(img => img.IsActive && img.Id == user.ProfilePicture.Id)
                ?? throw new NotFoundException("Image not found!");
        
        image.IsActive = false;
        user.ProfilePicture = null;

        var imgRes = repository.Update(image)
            ?? throw new DeleteFailException("Error on delete image");
        var userRes = userRepository.Update(user)
            ?? throw new DeleteFailException("Error on delete image");

        await repository.SaveAsync();
        await userRepository.SaveAsync();
    }

    public async Task UploadUserProfileImage(IFormFile file, int userId)
    {

        if(file == null || file.Length == 0)
            throw new Errors.InvalidDataException("Invalid Image");

        var user = await userRepository.Get()
            .Include(u => u.ProfilePicture)
            .SingleOrDefaultAsync(u => u.IsActive && u.Id == userId)
                ?? throw new NotFoundException("User not found!");

        var PImage = await ResizeImage(file, ImageSizeEnum.P);
        var MImage = await ResizeImage(file, ImageSizeEnum.M);
        var GImage = await ResizeImage(file, ImageSizeEnum.G);
        if (user.ProfilePicture is not null)
        {
            user.ProfilePicture.Image_P = PImage;
            user.ProfilePicture.Image_M = MImage;
            user.ProfilePicture.Image_G = GImage;
            user.ProfilePicture.IsActive = true;
        }
        else
        {
            user.ProfilePicture = new Image()
            {
                Image_P = PImage,
                Image_M = MImage,
                Image_G = GImage,
                IsActive = true
            };
        }

        userRepository.Update(user);
        await userRepository.SaveAsync();

    }
    public async Task<byte[]> GetImage(string id, ImageSizeEnum size)
    {
        var image = await repository.Get()
            .SingleOrDefaultAsync(i => i.FileGuid.ToString() == id)
                ?? throw new NotFoundException("Image not found");

        return size switch
        {
            ImageSizeEnum.P => image.Image_P,
            ImageSizeEnum.M => image.Image_M,
            ImageSizeEnum.G => image.Image_G,
            _ => image.Image_P,
        };
    }

    private static async Task<byte[]> ResizeImage (IFormFile file, ImageSizeEnum size) {
        using var ms = new MemoryStream();
        await file.CopyToAsync(ms);

        var ImageP = System.Drawing.Image.FromStream(ms);
        
        var thumb = ImageP.GetThumbnailImage((int)size, (int)size, null, nint.Zero);
        using var other = new MemoryStream();
        thumb.Save(other, System.Drawing.Imaging.ImageFormat.Jpeg);
        var bytes = other.GetBuffer();
        return bytes;
    }

    public static ImageDto? ConvertToDto (Image? image)
    {
        if(image is null)
            return null;

        string host = ConfigHelper.GetBaseUrl()
            ?? throw new UnknownServerError("");

        string baseUrl = $"{host}/api/v1/images/?id={image.FileGuid}&size=";
        return new(){
            PUrl = baseUrl + "P",
            MUrl = baseUrl + "M",
            GUrl = baseUrl + "G"
        };
    }
}
