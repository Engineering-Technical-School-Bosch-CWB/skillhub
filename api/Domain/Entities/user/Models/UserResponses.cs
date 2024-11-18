namespace Api.Domain.Models
{
    public class UserResponses
    {
        public required UserDTO Data { get; set; }
        public required string Message { get; set; }

        public static UserResponses Map(User user, string text)
        {
            return new UserResponses()
            {
                Data = UserDTO.Map(user),
                Message = text
            };
        }
    };
}