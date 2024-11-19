namespace Api.Domain.Models;
public class UserCreatedResponse
{
    public int UserId { get; set; }
    public string? Sector { get; set; }
    public string? Position { get; set; }

    public static UserCreatedResponse Map(User user, Sector sector, Position position)
    {
        return new UserCreatedResponse()
        {
            Position = position.Name,
            Sector = sector.Name,
            UserId = user.Id
        };
    }
};

public class UserUpdatedResponse
{
    public string? Name { get; set; }
    public string? EDV { get; set; }
    public string? Birthday { get; set; }
    public bool NewUser { get; set; }
    public bool IsActive { get; set; }

    public static UserUpdatedResponse Map(User user){
        return new UserUpdatedResponse()
        {
            Name = user.Name,
            Birthday = user.Birthday.ToString()!,
            EDV = user.Identification,
            IsActive = user.IsActive,
        };
    }
}