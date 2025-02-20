using Microsoft.EntityFrameworkCore;

using Api.Core;

public static partial class ServiceCollectionExtension
{
    public static void ConfigureDatabase(this IServiceCollection services, ConfigurationManager configuration)
    {
        var connectionString = configuration.GetConnectionString("SqlServer");
        services.AddDbContext<SkillhubContext>(
            options => options.UseSqlServer(connectionString)
        );
    }
}