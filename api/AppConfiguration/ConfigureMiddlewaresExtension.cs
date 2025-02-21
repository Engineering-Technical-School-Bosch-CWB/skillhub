using Api.Core.Middlewares;

namespace Api.Configuration;

public static partial class ServiceCollectionExtension
{
    public static IServiceCollection ConfigureMiddlewares(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddExceptionHandler<ErrorHandlingMiddleware>();
        services.AddTransient<AuthenticationMiddleware>();
        return services;
    }
}