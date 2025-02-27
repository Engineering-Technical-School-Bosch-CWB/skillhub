namespace Api.Domain.Models;

public class ImageDto
{
    public string? PUrl { get; set; }
    public string? MUrl { get; set; }
    public string? GUrl { get; set; }

    static public ImageDto Map(Image img){
        return new ();
    }

}