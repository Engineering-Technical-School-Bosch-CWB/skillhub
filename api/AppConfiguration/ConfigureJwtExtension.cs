using System.IdentityModel.Tokens.Jwt;
using Api.Core.Services;

namespace Api.Configuration;

public static partial class ServiceCollectionExtension
{
    public static IServiceCollection ConfigureJwt(this IServiceCollection services, ConfigurationManager configuration)
    {
        var jwtSettings = new JwtSettings()
        {
            SecretKey = configuration.GetSection("JwtSettings")
                    .GetValue<string>("SecretKey")!
        };
        services.AddSingleton(jwtSettings);
        services.AddSingleton<JwtSecurityTokenHandler>();
        services.AddScoped<JwtService>();

        return services;

    }
}