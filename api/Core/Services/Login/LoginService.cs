using Api.Domain.Models;
using Api.Domain.Services;
using Api.Core.Errors.Login;

using Microsoft.AspNetCore.Identity;
using Api.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Api.Core.Errors;
using Api.Core.Repositories;

namespace Api.Core.Services;
public class LoginService(
    IUserRepository userRepository, PasswordHasher<User> hasher, JwtService jwtService,
    IStudentService studentService
) : ILoginService
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly PasswordHasher<User> _hasher = hasher;
    
    private readonly JwtService _jwtService = jwtService;
    private readonly IStudentService _studentService = studentService;

    public async Task ResetPassword(int userId)
    {
        var user = await _userRepository.Get()
            .Where(u => u.IsActive)
            .Where(u => !u.IsArchived)
            .SingleOrDefaultAsync(u => u.Id == userId)
                ?? throw new NotFoundException("User not found");

        user.Hash = _hasher.HashPassword(user, user.Identification);
        _userRepository.Update(user);
        await _userRepository.SaveAsync();
    }

    public async Task<AppResponse<LoginResponse>> TryLogin(LoginPayload payload)
    {
        var user = await _userRepository.Get()
            .Include(u => u.OccupationArea)
            .Include(u => u.Position)
            .Include(u => u.Sector)
            .Include(u => u.ProfilePicture)
            .Where(u => u.IsActive)
            .FirstOrDefaultAsync(u => u.Identification == payload.Identification) ??
                throw new UserNotRegisteredException("Identification number not registered!");

        var passwordMatches = _hasher.VerifyHashedPassword(
            user,
            user.Hash,
            payload.Password
        );

        if(passwordMatches == PasswordVerificationResult.Failed)
            throw new WrongPasswordException("Wrong password!");

        var userDto = UserDTO.Map(user, await _studentService.GetByUserId(user.Id));
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