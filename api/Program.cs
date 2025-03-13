
using Api.Core.Middlewares;
using Api.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureDomain(builder.Configuration);

builder.Services
    .ConfigureDatabase(builder.Configuration)
    .ConfigureJwt(builder.Configuration)
    .ConfigureMiddlewares(builder.Configuration)
    .ConfigureAddons()
    .ConfigureEntitiesRepositories()
    .ConfigureEntitiesServices()
    .ConfigureMainConfigs();

var app = builder.Build();

if(app.Environment.IsProduction())
{
    System.Console.WriteLine("Setting variable DOTNET_ENVIRONMENT to Production");
    Environment.SetEnvironmentVariable("DOTNET_ENVIRONMENT","Production", EnvironmentVariableTarget.Process);
}

string environment = Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT") ?? "Development";
System.Console.WriteLine($"Environment: {environment}");
System.Console.WriteLine("To production add 'DOTNET_ENVIRONMENT=Production' variable");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

app.UseMiddleware<AuthenticationMiddleware>();

app.UseAuthorization();

app.UseExceptionHandler();

app.MapControllers();

app.Run();

