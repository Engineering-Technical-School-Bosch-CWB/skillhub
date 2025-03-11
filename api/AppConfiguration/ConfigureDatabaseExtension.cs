using Microsoft.EntityFrameworkCore;

using Api.Core;

namespace Api.Configuration;

public static partial class ServiceCollectionExtension
{
    public static IServiceCollection ConfigureDatabase(this IServiceCollection services, ConfigurationManager configuration)
    {
        var connectionString = configuration.GetConnectionString("SqlServer");
        System.Console.WriteLine(connectionString);
        services.AddDbContext<SkillhubContext>(
            options => options.UseSqlServer(connectionString)
        );

        return services;
    }
}