namespace Api.Domain.Models
{
    public class UserCreatedOutbound
    {
        public int UserId { get; set; }
        public string Sector { get; set; }
        public string Position { get; set; }

        public static UserCreatedOutbound Map(User user, Sector sector, Position position)
        {
            return new UserCreatedOutbound()
            {
                Position = position.Name,
                Sector = sector.Name,
                UserId = user.Id
            };
        }
    };

    public class UserUpdatedOutbound
    {
        public string Name { get; set; }
        public string EDV { get; set; }
        public string Card { get; set; }
        public string Birthday { get; set; }
        public bool NewUser { get; set; }
        public bool IsActive { get; set; }

        public static UserUpdatedOutbound Map(User user){
            return new UserUpdatedOutbound()
            {
                Name = user.Name,
                Birthday = user.Birthday.ToString()!,
                Card = user.Card,
                EDV = user.Identification,
                IsActive = user.IsActive,
                NewUser = user.NewUser
            };
        }
    }
}