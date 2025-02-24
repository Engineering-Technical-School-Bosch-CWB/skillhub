using Api.Core.Services;
using Api.Domain.Models;
using Api.Domain.Services;
using Microsoft.AspNetCore.Identity;

namespace Api.Configuration;

public static partial class ServiceCollectionExtension
{
    public static IServiceCollection ConfigureAddons(this IServiceCollection services)
    {
        services.AddScoped<UserContext>();
        services.AddSingleton<PasswordHasher<User>>();
        services.AddScoped<IPaginationService, PaginationService>();
        services.AddScoped<ILoginService, LoginService>();
        services.AddScoped<IPermissionService, PermissionService>();

        return services;

    }
}