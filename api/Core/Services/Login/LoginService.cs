using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors.Login;

using Microsoft.AspNetCore.Identity;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Api.Core.Services;
public class LoginService : ILoginService
{
    private readonly IUserRepository _userRepository;
    private readonly PasswordHasher<User> _hasher;
    private readonly JwtService _jwtService;

    public LoginService(IUserRepository userRepository, PasswordHasher<User> hasher, JwtService jwtService)
    {
        _userRepository = userRepository;
        _hasher = hasher;
        _jwtService = jwtService;
    }

    public async Task<AppResponse<LoginResponse>> TryLogin(LoginPayload payload)
    {
        var user = await _userRepository.Get()
            .Include(u => u.Area)
            .Include(u => u.Position)
            .Include(u => u.Sector)
            .FirstOrDefaultAsync(u => u.Identification == payload.Identification) ??
                throw new UserNotRegisteredException("Identification number still not registered.");

        var passwordMatches = _hasher.VerifyHashedPassword(
            user,
            user.Hash,
            payload.Password
        );

        if(passwordMatches == PasswordVerificationResult.Failed)
        {
            throw new WrongPasswordException("Wrong password.");
        }

        var userDto = UserDTO.Map(user);
        var token = _jwtService.GenerateToken(userDto);

        if(passwordMatches == PasswordVerificationResult.Success &&
            payload.Password == user.Identification)
        {
            return new AppResponse<LoginResponse>(
                new LoginResponse(true, userDto, token),
                "User needs to complete registration."
            ); 
        }

        return new AppResponse<LoginResponse>(
            new LoginResponse(false, userDto, token),
            "User logged in successfully!"
        );
    }
}