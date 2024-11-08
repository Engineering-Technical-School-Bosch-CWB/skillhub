using api.Core.Errors.Pagination;
using api.Domain.Services.Login;
using Api.Core.Services;
using Api.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Core.Services.Login
{
    public class LoginService(UserService userService, PasswordHasher<User> hasher) : ILoginService
    {
        private readonly UserService _userService;
        private readonly PasswordHasher<User> _hasher;
        private readonly JWTService jWTService;

        public async Task<LoginResponse> TryLogin(LoginPayload payload)
        {
            var user = await userService.GetByIdentification(payload.Identification)
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

            if(passwordMatches == PasswordVerificationResult.Success &&
                payload.Password == user.Identification)
            {
                return new LoginResponse(
                    true, 
                    UserDTO.BuildFromEntity(user), 
                    jWTService.GenerateToken(result)
                );
            }

            var result = LoginResult.Succeeded()
            {
                UserId = user.Id,
                UserName = user.Name
            };

            return new LoginResponse(
                false, 
                UserDTO.BuildFromEntity(user), 
                jWTService.GenerateToken(result)
            );
        }
    }
}