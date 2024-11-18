using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Identity;
using Api.Core.Services;
using Api.Core.Errors.Login;

namespace Api.Core.Services
{
    public class LoginService : ILoginService
    {
        private readonly IUserService _userService;
        private readonly PasswordHasher<User> _hasher;
        private readonly JwtService _jwtService;

        public LoginService(UserService userService, PasswordHasher<User> hasher, JwtService jwtService)
        {
            _userService = userService;
            _hasher = hasher;
            _jwtService = jwtService;
        }

        public async Task<LoginResponse> TryLogin(LoginPayload payload)
        {
            var user = await _userService.GetUserByIdentification(payload.Identification)
                ?? throw new UserNotRegisteredException("Identification number still not registered.");

            var passwordMatches = _hasher.VerifyHashedPassword(
                user,
                user.Hash,
                payload.Password
            );

            if(passwordMatches == PasswordVerificationResult.Failed)
            {
                throw new WrongPasswordException("Wrong password.");
            }

            var usersPosition = user.Position.Name switch 
            {
                "subofficer" => UsersPositions.SUBOFFICER,
                "instructor" => UsersPositions.INSTRUCTOR,
                "aprentice" => UsersPositions.STUDENT,
                _ => throw new NoSuchPositionException("No such user's position registered.")
            };

            var result = new LoginResult.Succeeded
            {
                UserId = user.Id,
                UserName = user.Name,
                Position = usersPosition 
            };

            if(passwordMatches == PasswordVerificationResult.Success &&
                payload.Password == user.Identification)
            {
                return new LoginResponse(
                    true, 
                    UserUpdatedOutbound.Map(user), 
                    _jwtService.GenerateToken(result)
                );
            }

            return new LoginResponse(
                false, 
                UserUpdatedOutbound.Map(user), 
                _jwtService.GenerateToken(result)
            );
        }
    }
}