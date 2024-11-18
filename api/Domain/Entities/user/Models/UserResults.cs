namespace Api.Domain.Models
{
    public class UserResult
    {
        public required UserDTO Data { get; set; }
        public required string Message { get; set; }

        public static UserResult Map(User user, string text)
        {
            return new UserResult()
            {
                Data = UserDTO.Map(user),
                Message = text
            };
        }
    };

    public class UserUpdatedOutbound
    {
        public string? Name { get; set; }
        public string? EDV { get; set; }
        public string? Card { get; set; }
        public string? Birthday { get; set; }
        public bool NewUser { get; set; }
        public bool IsActive { get; set; }

        public static UserUpdatedOutbound Map(User user){
            return new UserUpdatedOutbound()
            {
                Name = user.Name,
                Birthday = user.Birthday.ToString()!,
                EDV = user.Identification,
                IsActive = user.IsActive,
            };
        }
    }
}