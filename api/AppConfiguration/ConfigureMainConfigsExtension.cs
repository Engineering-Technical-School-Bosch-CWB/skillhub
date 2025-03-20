using System.Text.Json.Serialization;
using Api.Core.Middlewares;

namespace Api.Configuration;

public static partial class ServiceCollectionExtension
{
    public static IServiceCollection ConfigureMainConfigs(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(Program));
        services.AddCors();

        services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

        services.AddAuthorization();    
        services.AddExceptionHandler<ErrorHandlingMiddleware>();
        services.AddProblemDetails();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        
        return services;
    }
}